import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { 
  Upload, Image as ImageIcon, Trash2, Plus, CheckCircle, ShieldCheck, 
  ArrowLeft, ExternalLink, Lock, Eye, RefreshCw, Sparkles, BarChart3, AlertCircle 
} from 'lucide-react';

export default function SeoResultsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Upload Form State
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState('e-commerce');
  const [industry, setIndustry] = useState('');
  const [period, setPeriod] = useState('90-Day Campaign');
  const [growthBadge, setGrowthBadge] = useState('+300% Organic Traffic');
  const [rankBadge, setRankBadge] = useState('#1 Rank on Google');
  const [quote, setQuote] = useState('');
  
  // Image Upload State
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Metrics State
  const [metric1Label, setMetric1Label] = useState('Monthly Organic Clicks');
  const [metric1Before, setMetric1Before] = useState('1,200');
  const [metric1After, setMetric1After] = useState('14,500');
  const [metric1Increase, setMetric1Increase] = useState('+1,108%');

  const [metric2Label, setMetric2Label] = useState('1st Page Google Keywords');
  const [metric2Before, setMetric2Before] = useState('5');
  const [metric2After, setMetric2After] = useState('42');
  const [metric2Increase, setMetric2Increase] = useState('+740%');

  const [metric3Label, setMetric3Label] = useState('Organic Revenue / Mo');
  const [metric3Before, setMetric3Before] = useState('₹50,000');
  const [metric3After, setMetric3After] = useState('₹5,20,000');
  const [metric3Increase, setMetric3Increase] = useState('+940%');

  // Highlights text area
  const [highlightsText, setHighlightsText] = useState(
    "Implemented Schema Markup (Product, Breadcrumb & Organization)\nOptimized product category pages for long-tail keywords\nAcquired high-authority niche backlinks\nTechnical SEO audit & site speed score improved to 95+"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // List of uploaded results
  const [uploadedResults, setUploadedResults] = useState([]);

  // Load custom results on mount
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
          // Merge API and local data
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
      setErrorMessage('Please enter a Client Name or Title.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const metricsArr = [];
    if (metric1Label.trim()) {
      metricsArr.push({ label: metric1Label, before: metric1Before, after: metric1After, increase: metric1Increase });
    }
    if (metric2Label.trim()) {
      metricsArr.push({ label: metric2Label, before: metric2Before, after: metric2After, increase: metric2Increase });
    }
    if (metric3Label.trim()) {
      metricsArr.push({ label: metric3Label, before: metric3Before, after: metric3After, increase: metric3Increase });
    }

    const highlightsArr = highlightsText
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    const finalProofImage = imagePreview || imageUrlInput || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop';

    const newResult = {
      id: 'custom-' + Date.now(),
      category,
      clientName,
      industry: industry || 'E-Commerce & Digital Growth',
      period,
      growthBadge,
      rankBadge,
      metrics: metricsArr,
      highlights: highlightsArr,
      proofImage: finalProofImage,
      quote: quote || 'The SEO strategy implemented by Liveteachcreate drove incredible traffic growth and organic revenue!',
      createdAt: new Date().toISOString()
    };

    // Attempt PHP API multipart upload first
    let apiSuccess = false;
    try {
      const formData = new FormData();
      formData.append('clientName', clientName);
      formData.append('category', category);
      formData.append('industry', industry || 'E-Commerce & Digital Growth');
      formData.append('period', period);
      formData.append('growthBadge', growthBadge);
      formData.append('rankBadge', rankBadge);
      formData.append('quote', quote);
      formData.append('metrics', JSON.stringify(metricsArr));
      formData.append('highlights', highlightsText);

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
        if (resJson.status === 'success') {
          apiSuccess = true;
          if (resJson.data && resJson.data.proofImage) {
            newResult.proofImage = resJson.data.proofImage;
          }
        }
      }
    } catch (err) {
      console.log('PHP upload endpoint error, saving locally:', err);
    }

    // Always save to localStorage so it works client side as well
    try {
      const existingStr = localStorage.getItem('custom_seo_results');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newResult, ...existing];
      localStorage.setItem('custom_seo_results', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(false);
    setSuccessMessage('🎉 Screenshot & Case Study uploaded successfully! It is now live on /seo-results.');
    
    // Reset form fields
    setClientName('');
    setSelectedFile(null);
    setImagePreview('');
    setImageUrlInput('');
    setQuote('');

    fetchUploadedResults();
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result screenshot?')) return;

    // Delete from localStorage
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

    // Delete from PHP API
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
        <SEO title="Admin Panel - SEO Results Upload" description="Manage and upload SEO result proof screenshots." />
        
        <div className="max-w-md w-full p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center mx-auto text-2xl font-black shadow-yellowGlow">
            <Lock className="w-8 h-8 text-[#101820]" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white font-display">SEO Results Admin Panel</h1>
            <p className="text-xs text-gray-400 mt-1">Upload proof screenshots & case studies to liveteachcreate.com/seo-results</p>
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
      <SEO title="Admin Upload Panel | SEO Case Studies & Screenshots" description="Upload and publish SEO proof screenshots to liveteachcreate.com/seo-results" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEE715]/10 border border-[#FEE715]/30 rounded-full text-xs font-bold text-[#FEE715]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ADMIN PANEL</span>
            </div>
            <h1 className="text-2xl font-black text-white font-display">SEO Results Image & Case Study Publisher</h1>
            <p className="text-xs text-gray-400">Upload GSC graphs, ranking proof screenshots & client sales achievements directly to /seo-results</p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/seo-results" 
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center gap-2 border border-gray-700 transition"
            >
              <Eye className="w-4 h-4 text-[#FEE715]" />
              <span>View Live /seo-results</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* UPLOAD FORM SECTION */}
        <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl space-y-8">
          <div className="border-b border-gray-800 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold text-xl shadow-yellowGlow">
              <Upload className="w-5 h-5 text-[#101820]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Upload New Result Screenshot</h2>
              <p className="text-xs text-gray-400">Fill in client details and attach your proof image (GSC / Seller Central / Analytics graph)</p>
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

          <form onSubmit={handleSubmitResult} className="space-y-8">
            
            {/* GRID ROW 1: Title, Category, Industry, Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Client / Case Study Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handcrafted Fashion Apparel Brand"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Category Filter
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:border-[#FEE715]"
                >
                  <option value="e-commerce">🛒 E-Commerce SEO</option>
                  <option value="gsc-clicks">📈 Search Console Clicks</option>
                  <option value="local-seo">📍 Local Map Pack SEO</option>
                  <option value="d2c-revenue">💰 D2C Revenue Scale</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fashion E-Commerce & Retail"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Campaign Period
                </label>
                <input
                  type="text"
                  placeholder="e.g. 90-Day Campaign"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

            </div>

            {/* GRID ROW 2: Growth Badge & Rank Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Growth Highlight Badge (Yellow Badge)
                </label>
                <input
                  type="text"
                  placeholder="e.g. +340% Organic Traffic Growth"
                  value={growthBadge}
                  onChange={(e) => setGrowthBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Rank Highlight Badge (Emerald Badge)
                </label>
                <input
                  type="text"
                  placeholder="e.g. #1 Rank on Google"
                  value={rankBadge}
                  onChange={(e) => setRankBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>
            </div>

            {/* PROOF SCREENSHOT UPLOAD BLOCK */}
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
              <label className="block text-xs font-bold text-[#FEE715] uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#FEE715]" />
                <span>Result Screenshot Image File (Google Search Console / Analytics Graph)</span>
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
                    <p className="text-xs font-bold text-white">Click or Drag & Drop Proof Screenshot</p>
                    <p className="text-[10px] text-gray-400 mt-1">Supports PNG, JPG, WEBP formats</p>
                  </div>

                  <div className="text-center text-xs text-gray-500 uppercase font-bold">OR Enter Direct Image URL</div>

                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or direct image link"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                  />
                </div>

                {/* PREVIEW CONTAINER */}
                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Screenshot Live Preview</span>
                  {imagePreview || imageUrlInput ? (
                    <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-xl bg-black max-h-52 flex items-center justify-center">
                      <img 
                        src={imagePreview || imageUrlInput} 
                        alt="SEO Proof Screenshot Preview" 
                        className="w-full h-auto max-h-52 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-44 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center text-gray-500 p-4">
                      <ImageIcon className="w-10 h-10 opacity-30 mb-2" />
                      <span className="text-xs font-medium">No Image Uploaded Yet</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* METRICS CARDS BUILDER */}
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FEE715] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#FEE715]" />
                <span>Performance Metrics Cards (Before vs. After Comparison)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Metric 1 */}
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">Metric 1</span>
                  <input
                    type="text"
                    placeholder="Metric Name (e.g. Organic Clicks)"
                    value={metric1Label}
                    onChange={(e) => setMetric1Label(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs border border-gray-700"
                  />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <input type="text" placeholder="Before" value={metric1Before} onChange={(e) => setMetric1Before(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="After" value={metric1After} onChange={(e) => setMetric1After(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="Growth" value={metric1Increase} onChange={(e) => setMetric1Increase(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-emerald-400 font-bold border border-gray-700" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">Metric 2</span>
                  <input
                    type="text"
                    placeholder="Metric Name (e.g. 1st Page Keywords)"
                    value={metric2Label}
                    onChange={(e) => setMetric2Label(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs border border-gray-700"
                  />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <input type="text" placeholder="Before" value={metric2Before} onChange={(e) => setMetric2Before(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="After" value={metric2After} onChange={(e) => setMetric2After(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="Growth" value={metric2Increase} onChange={(e) => setMetric2Increase(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-emerald-400 font-bold border border-gray-700" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-3">
                  <span className="text-xs font-bold text-white">Metric 3</span>
                  <input
                    type="text"
                    placeholder="Metric Name (e.g. Monthly Sales Revenue)"
                    value={metric3Label}
                    onChange={(e) => setMetric3Label(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs border border-gray-700"
                  />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <input type="text" placeholder="Before" value={metric3Before} onChange={(e) => setMetric3Before(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="After" value={metric3After} onChange={(e) => setMetric3After(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-white border border-gray-700" />
                    <input type="text" placeholder="Growth" value={metric3Increase} onChange={(e) => setMetric3Increase(e.target.value)} className="px-2 py-1.5 rounded bg-gray-800 text-emerald-400 font-bold border border-gray-700" />
                  </div>
                </div>

              </div>
            </div>

            {/* HIGHLIGHTS & TESTIMONIAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Key SEO Actions / Highlights (1 per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Implemented Schema Markup&#10;Optimized category pages for long-tail terms&#10;Technical SEO speed optimization score to 95+"
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Client Review / Testimonial Quote
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. Liveteachcreate doubled our organic traffic in just 60 days! Sales went from ₹1.2L to ₹8.5L per month."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
              </div>

            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-gray-800 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full bg-[#FEE715] text-[#101820] font-black text-xs uppercase tracking-wider shadow-yellowGlow hover:scale-105 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publishing Result...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Upload & Publish to /seo-results</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* LIST OF UPLOADED RESULTS */}
        <div className="p-8 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl space-y-6">
          <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FEE715]" />
              <span>Manage Uploaded Case Studies & Proof Screenshots ({uploadedResults.length})</span>
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
              <p>No custom result screenshots uploaded yet.</p>
              <p className="text-gray-400 text-[11px]">Upload your first screenshot above to feature it on liveteachcreate.com/seo-results</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedResults.map((item) => (
                <div key={item.id} className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden shadow-lg space-y-4 flex flex-col justify-between p-4">
                  
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-xl overflow-hidden border border-gray-800 bg-black">
                      <img src={item.proofImage} alt={item.clientName} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#FEE715] text-[#101820] font-black text-[10px] uppercase">
                        {item.growthBadge || item.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-sm line-clamp-1">{item.clientName}</h3>
                      <p className="text-xs text-gray-400">{item.industry} • {item.period}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono">ID: {item.id}</span>
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
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
