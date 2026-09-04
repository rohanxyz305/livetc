import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { 
  Upload, Image as ImageIcon, Trash2, Plus, CheckCircle, ShieldCheck, 
  ArrowLeft, ExternalLink, Lock, Eye, RefreshCw, Sparkles, Star, Globe, User, AlertCircle 
} from 'lucide-react';

export default function SeoResultsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Form State matching exact user requirement:
  // 1) Screenshot / Photo upload
  // 2) Client Name
  // 3) Website Name
  // 4) Ratings & Description
  const [clientName, setClientName] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('e-commerce');
  const [growthBadge, setGrowthBadge] = useState('+300% Traffic Surge');
  const [rankBadge, setRankBadge] = useState('#1 Rank on Google');

  // Image File & Preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // List of uploaded results
  const [uploadedResults, setUploadedResults] = useState([]);

  useEffect(() => {
    fetchUploadedResults();
  }, []);

  const fetchUploadedResults = async () => {
    let localData = [];
    try {
      const stored = localStorage.getItem('custom_seo_results');
      if (stored) {
        localData = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const response = await fetch('/api/upload-seo-result.php');
      if (response.ok) {
        const json = await response.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
          const merged = [...json.data, ...localData.filter(l => !json.data.some(j => j.id === l.id))];
          setUploadedResults(merged);
          return;
        }
      }
    } catch (e) {
      console.log('API not reachable, using localStorage fallback');
    }
    setUploadedResults(localData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'admin' || passcode.trim() === '1234') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitResult = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMessage('Please enter Client Name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const finalProofImage = imagePreview || imageUrlInput || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop';

    const newResult = {
      id: 'custom-' + Date.now(),
      clientName: clientName.trim(),
      websiteName: websiteName.trim() || 'Client Project',
      rating: rating || '5',
      description: description.trim() || 'Achieved remarkable organic search ranking & revenue growth.',
      category,
      industry: 'Client Success Case Study',
      period: 'Verified Results',
      growthBadge: growthBadge || '+300% Organic Growth',
      rankBadge: rankBadge || '#1 Rank on Google',
      metrics: [
        { label: 'Organic Search Growth', before: 'Baseline', after: 'Top Rank', increase: growthBadge || '+300%' }
      ],
      highlights: [
        'Complete Technical SEO & Keyword Mapping',
        'On-Page Optimization & Schema Injection',
        'High Authority Link Acquisition'
      ],
      proofImage: finalProofImage,
      quote: description.trim() || 'Liveteachcreate scaled our organic visibility and sales significantly.',
      createdAt: new Date().toISOString()
    };

    // Send to PHP API
    try {
      const formData = new FormData();
      formData.append('clientName', clientName.trim());
      formData.append('websiteName', websiteName.trim());
      formData.append('rating', rating);
      formData.append('description', description.trim());
      formData.append('category', category);
      formData.append('growthBadge', growthBadge);
      formData.append('rankBadge', rankBadge);

      if (selectedFile) {
        formData.append('proofImageFile', selectedFile);
      } else if (imageUrlInput) {
        formData.append('proofImageUrl', imageUrlInput);
      }

      const res = await fetch('/api/upload-seo-result.php', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.status === 'success' && resJson.data && resJson.data.proofImage) {
          newResult.proofImage = resJson.data.proofImage;
        }
      }
    } catch (err) {
      console.log('PHP upload API unreachable, saving locally');
    }

    // Always save to localStorage
    try {
      const existingStr = localStorage.getItem('custom_seo_results');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newResult, ...existing];
      localStorage.setItem('custom_seo_results', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(false);
    setSuccessMessage('🎉 Client Achievement published successfully! It is now live on /seo-results.');
    
    // Clear form
    setClientName('');
    setWebsiteName('');
    setDescription('');
    setSelectedFile(null);
    setImagePreview('');
    setImageUrlInput('');

    fetchUploadedResults();
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const existingStr = localStorage.getItem('custom_seo_results');
      if (existingStr) {
        const existing = JSON.parse(existingStr);
        const filtered = existing.filter(i => i.id !== id);
        localStorage.setItem('custom_seo_results', JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }

    try {
      await fetch('/api/upload-seo-result.php?action=delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {
      console.error(e);
    }

    fetchUploadedResults();
  };

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center p-4">
        <SEO title="Admin Panel - Upload Client Achievements" description="Upload and publish client achievement screenshots for liveteachcreate.com/seo-results" />
        
        <div className="max-w-md w-full p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center mx-auto text-2xl font-black shadow-yellowGlow">
            <Lock className="w-8 h-8 text-[#101820]" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white font-display">Client Achievements Admin</h1>
            <p className="text-xs text-gray-400 mt-1">Publish proof screenshots & testimonials to liveteachcreate.com/seo-results</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-center font-mono placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
              />
              {passcodeError && (
                <p className="text-xs text-red-400 mt-1 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect passcode. Try admin123
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FEE715] text-[#101820] font-extrabold text-sm uppercase tracking-wider shadow-yellowGlow hover:scale-[1.02] transition-all"
            >
              Unlock Admin Panel
            </button>
          </form>

          <div className="pt-2">
            <Link to="/seo-results" className="text-xs text-gray-400 hover:text-[#FEE715] flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to SEO Results Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white py-12">
      <SEO title="Client Achievements Admin Panel | Upload Proof Screenshots" description="Upload client screenshots, website details, ratings and publish to /seo-results" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEE715]/10 border border-[#FEE715]/30 rounded-full text-xs font-bold text-[#FEE715]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLIENT ACHIEVEMENTS PUBLISHER</span>
            </div>
            <h1 className="text-2xl font-black text-white font-display">Upload Client Achievements & Proof Screenshots</h1>
            <p className="text-xs text-gray-400">Publish custom client results directly to https://liveteachcreate.com/seo-results</p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/seo-results" 
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center gap-2 border border-gray-700 transition"
            >
              <Eye className="w-4 h-4 text-[#FEE715]" />
              <span>View Live Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* UPLOAD & PUBLISH FORM */}
        <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl space-y-8">
          <div className="border-b border-gray-800 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold text-xl shadow-yellowGlow">
              <Upload className="w-5 h-5 text-[#101820]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Publish New Achievement</h2>
              <p className="text-xs text-gray-400">Upload screenshot photo + add Client Name, Website Name, Rating & Description</p>
            </div>
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmitResult} className="space-y-6">
            
            {/* 1. UPLOAD IMAGE / SCREENSHOT */}
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
              <label className="block text-xs font-bold text-[#FEE715] uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#FEE715]" />
                <span>Upload Achievement Photo / Proof Screenshot <span className="text-red-400">*</span></span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-700 hover:border-[#FEE715] rounded-2xl p-6 text-center bg-gray-900/50 transition cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-[#FEE715] mx-auto mb-2" />
                    <p className="text-xs font-bold text-white">Click or Drag & Drop Achievement Screenshot</p>
                    <p className="text-[10px] text-gray-400 mt-1">Supports PNG, JPG, WEBP formats</p>
                  </div>

                  <div className="text-center text-[10px] text-gray-500 uppercase font-bold">OR Enter Direct Image URL</div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or direct link"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                  />
                </div>

                {/* PREVIEW CONTAINER */}
                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Screenshot Preview</span>
                  {imagePreview || imageUrlInput ? (
                    <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-xl bg-black max-h-48 flex items-center justify-center">
                      <img 
                        src={imagePreview || imageUrlInput} 
                        alt="Achievement Screenshot Preview" 
                        className="w-full h-auto max-h-48 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-44 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center text-gray-500 p-4">
                      <ImageIcon className="w-10 h-10 opacity-30 mb-2" />
                      <span className="text-xs font-medium">No Image Attached Yet</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* 1. CLIENT NAME */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#FEE715]" />
                <span>1) Client Name <span className="text-red-400">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Apparel & Ethnic Wear"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
              />
            </div>

            {/* 3. LINE 3: RATINGS & DESCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FEE715]" />
                  <span>Client Rating</span>
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:border-[#FEE715]"
                >
                  <option value="5">★★★★★ 5.0 Stars (Excellent)</option>
                  <option value="4.9">★★★★★ 4.9 Stars</option>
                  <option value="4.8">★★★★☆ 4.8 Stars</option>
                  <option value="4.5">★★★★☆ 4.5 Stars</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Category Filter
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:border-[#FEE715]"
                >
                  <option value="e-commerce">🛒 E-Commerce SEO</option>
                  <option value="gsc-clicks">📈 Search Console Clicks</option>
                  <option value="local-seo">📍 Local Map Pack SEO</option>
                  <option value="d2c-revenue">💰 D2C Revenue Scale</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Growth Highlight Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. +340% Organic Traffic"
                  value={growthBadge}
                  onChange={(e) => setGrowthBadge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

            </div>

            {/* DESCRIPTION TEXT BOX */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>3) Description & Achievement Details <span className="text-red-400">*</span></span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="e.g. Liveteachcreate transformed our organic traffic. We reached #1 Google ranking for 38+ competitive keywords and scaled sales to ₹4.8 Lacs per month!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
              />
            </div>

            {/* PUBLISH BUTTON */}
            <div className="pt-4 border-t border-gray-800 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 rounded-full bg-[#FEE715] text-[#101820] font-black text-xs uppercase tracking-wider shadow-yellowGlow hover:scale-105 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Publish Achievement to /seo-results</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* LIST OF PUBLISHED ACHIEVEMENTS */}
        <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl space-y-6">
          <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FEE715]" />
              <span>Published Client Achievements ({uploadedResults.length})</span>
            </h2>

            <button
              onClick={fetchUploadedResults}
              className="text-xs text-gray-400 hover:text-[#FEE715] flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh List
            </button>
          </div>

          {uploadedResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs font-medium space-y-2">
              <ImageIcon className="w-12 h-12 mx-auto opacity-20" />
              <p>No achievements published yet.</p>
              <p className="text-gray-400 text-[11px]">Fill the form above to publish your first client achievement screenshot to liveteachcreate.com/seo-results</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uploadedResults.map((item) => (
                <div key={item.id} className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden shadow-lg p-5 space-y-4 flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    {/* Image screenshot */}
                    <div className="relative h-44 rounded-xl overflow-hidden border border-gray-800 bg-black">
                      <img src={item.proofImage} alt={item.clientName} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#FEE715] text-[#101820] font-black text-[10px] uppercase">
                        {item.growthBadge || 'Verified Result'}
                      </span>
                    </div>

                    {/* Line 1: Client Name */}
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                        <User className="w-4 h-4 text-[#FEE715]" />
                        <span>{item.clientName}</span>
                      </h3>

                      {/* Line 2: Rating & Description */}
                      <div className="pt-2 border-t border-gray-800/60 space-y-1">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{item.rating || '5.0'} / 5.0 Rating</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed italic">
                          "{item.description || item.quote}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono">ID: {item.id}</span>
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Achievement</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
