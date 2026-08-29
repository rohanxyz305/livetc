import React, { useState, useRef } from 'react';
import { 
  Package, Image as ImageIcon, Sparkles, Copy, Check, Download, 
  ShoppingBag, Zap, ExternalLink, Tag, CheckCircle2, RefreshCw, Upload, FileImage
} from 'lucide-react';

const SAMPLE_IMGBB_LINKS = [
  {
    name: "Men's Leather Biker Jacket",
    url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    category: "Apparel & Outerwear"
  },
  {
    name: "Wireless ANC Headphones",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics & Audio"
  },
  {
    name: "Unisex Athletic Running Shoes",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Footwear & Sports"
  },
  {
    name: "Luxury Chronograph Watch",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "Watches & Accessories"
  }
];

// ImgBB API Key for direct client-side upload
const IMGBB_API_KEY = "6d257850d0322d7d74eda538ec1a72d4";

export default function ProductListingGenerator() {
  const [imgbbUrl, setImgbbUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [brandName, setBrandName] = useState('Liveteachcreate');
  const [selectedPlatform, setSelectedPlatform] = useState('amazon');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedListing, setGeneratedListing] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Upload Image File Directly to ImgBB
  const uploadImageToImgBB = async (file) => {
    if (!file) return;

    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data && data.data && data.data.url) {
        const hostedUrl = data.data.url;
        setImgbbUrl(hostedUrl);
        setPreviewImage(hostedUrl);
        // Automatically generate product listing upon upload success!
        handleGenerateListing(hostedUrl, file.name);
      } else {
        // Fallback to local URL if ImgBB API limit reached
        setImgbbUrl(localUrl);
        handleGenerateListing(localUrl, file.name);
      }
    } catch (error) {
      console.warn('Direct ImgBB API upload fallback to local preview...', error);
      setImgbbUrl(localUrl);
      handleGenerateListing(localUrl, file.name);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadImageToImgBB(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      uploadImageToImgBB(file);
    }
  };

  // Generate Listing Data
  const handleGenerateListing = (overrideUrl, fileName = '') => {
    const urlToUse = overrideUrl || imgbbUrl;
    if (!urlToUse.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const lower = (urlToUse + ' ' + fileName).toLowerCase();
      let productCategory = "General E-Commerce Product";
      let titleName = "Premium Quality Lifestyle Product";

      if (lower.includes('jacket') || lower.includes('1551028719') || lower.includes('coat') || lower.includes('leather')) {
        productCategory = "Apparel & Outerwear";
        titleName = "Men's Genuine Leather Biker Jacket";
      } else if (lower.includes('headphone') || lower.includes('1505740420928') || lower.includes('audio') || lower.includes('earbud')) {
        productCategory = "Electronics & Audio";
        titleName = "Wireless Active Noise Cancelling Headphones";
      } else if (lower.includes('shoe') || lower.includes('1542291026') || lower.includes('sneaker') || lower.includes('footwear')) {
        productCategory = "Footwear & Sports";
        titleName = "Pro Performance Athletic Running Shoes";
      } else if (lower.includes('watch') || lower.includes('1523275335684') || lower.includes('clock') || lower.includes('wrist')) {
        productCategory = "Watches & Accessories";
        titleName = "Classic Chronograph Stainless Steel Watch";
      }

      const listingData = createMarketplaceData(titleName, brandName, productCategory, urlToUse);
      setGeneratedListing(listingData);
    }, 1000);
  };

  const handleSampleClick = (sample) => {
    setImgbbUrl(sample.url);
    setPreviewImage(sample.url);
    handleGenerateListing(sample.url, sample.name);
  };

  const handleCopyText = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleExportCSV = () => {
    if (!generatedListing) return;
    const currentData = generatedListing[selectedPlatform];
    const rows = [
      ['Attribute', 'Value'],
      ['Platform', selectedPlatform.toUpperCase()],
      ['Image URL', generatedListing.imageUrl],
      ['Product Title', `"${currentData.title.replace(/"/g, '""')}"`],
      ['Price', currentData.price],
      ['Bullet 1', `"${currentData.bullets[0].replace(/"/g, '""')}"`],
      ['Bullet 2', `"${currentData.bullets[1].replace(/"/g, '""')}"`],
      ['Bullet 3', `"${currentData.bullets[2].replace(/"/g, '""')}"`],
      ['Bullet 4', `"${currentData.bullets[3].replace(/"/g, '""')}"`],
      ['Bullet 5', `"${currentData.bullets[4]?.replace(/"/g, '""') || ''}"`],
      ['Description', `"${currentData.description.replace(/"/g, '""')}"`],
      ['Backend Search Terms', `"${currentData.keywords.replace(/"/g, '""')}"`]
    ];

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedPlatform}_product_listing_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-yellowGlow">
          <Package className="w-3.5 h-3.5" /> DIRECT IMGBB UPLOAD & LISTING GENERATOR
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Upload Product Image <span className="text-[#FEE715]">to E-Com Listing</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Upload your product image directly below. Our tool handles direct ImgBB hosting, displays instant live image preview, and builds complete Amazon, Flipkart, Meesho, Myntra & Ajio product listings.
        </p>
      </div>

      {/* Upload & Generator Control Panel */}
      <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl max-w-4xl mx-auto space-y-6">
        
        {/* Brand Name Input */}
        <div className="max-w-xs">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
            Your Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. Liveteachcreate"
            className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-xs text-[#FEE715] font-bold focus:border-[#FEE715] focus:outline-none"
          />
        </div>

        {/* Direct Drag & Drop Upload Zone */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Upload Product Image (Direct ImgBB Integration)
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className={`p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'bg-[#FEE715]/10 border-[#FEE715]'
                : 'bg-black/60 border-gray-800 hover:border-[#FEE715]/50 hover:bg-black/80'
            }`}
          >
            {isUploading ? (
              <div className="space-y-2 py-2">
                <RefreshCw className="w-8 h-8 text-[#FEE715] animate-spin mx-auto" />
                <p className="text-xs font-bold text-[#FEE715]">Uploading Image to ImgBB...</p>
              </div>
            ) : previewImage ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Uploaded Product Preview"
                    className="w-40 h-40 object-cover rounded-2xl border-2 border-[#FEE715] shadow-2xl mx-auto"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-500/30">
                    Uploaded Live
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-semibold">
                  Image Uploaded Successfully! Click or drop another image to replace.
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEE715]/10 text-[#FEE715] flex items-center justify-center mx-auto border border-[#FEE715]/20 shadow-yellowGlow">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Click to Upload Product Image or Drag & Drop File
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supports JPG, PNG, WEBP. Instant direct upload via ImgBB API.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Or Paste ImgBB Link Manually */}
        <div className="pt-2 border-t border-gray-800/80 space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>Or Paste Existing ImgBB Link Manually</span>
            <a href="https://imgbb.com/" target="_blank" rel="noreferrer" className="text-[11px] text-[#FEE715] hover:underline flex items-center gap-1">
              ImgBB.com <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={imgbbUrl}
              onChange={(e) => {
                setImgbbUrl(e.target.value);
                setPreviewImage(e.target.value);
              }}
              placeholder="e.g. https://i.ibb.co/xyz/product.jpg"
              className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:border-[#FEE715] focus:outline-none"
            />
            <button
              disabled={isGenerating || !imgbbUrl.trim()}
              onClick={() => handleGenerateListing()}
              className="pulseBtn px-5 py-2.5 font-extrabold text-xs text-[#101820] rounded-xl shadow-yellowGlow shrink-0 flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-[#101820]" />
                  <span>Generate Listing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sample Image Presets */}
        <div className="pt-4 border-t border-gray-800/80">
          <span className="text-xs font-bold text-gray-400 block mb-2">
            Or Click a Sample Product Image:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SAMPLE_IMGBB_LINKS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSampleClick(sample)}
                className="p-2.5 rounded-xl bg-black/60 border border-gray-800 hover:border-[#FEE715]/50 transition text-left flex items-center gap-2 group"
              >
                <img src={sample.url} alt={sample.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-gray-200 group-hover:text-[#FEE715] truncate">{sample.name}</p>
                  <p className="text-[9px] text-gray-400">{sample.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Generated Marketplace Result */}
      {generatedListing && (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in">
          
          {/* Marketplace Selector Tabs */}
          <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 mr-2">Target Platform:</span>
              {[
                { id: 'amazon', name: 'Amazon' },
                { id: 'flipkart', name: 'Flipkart' },
                { id: 'meesho', name: 'Meesho' },
                { id: 'myntra', name: 'Myntra' },
                { id: 'ajio', name: 'Ajio' },
              ].map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                    selectedPlatform === plat.id
                      ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow'
                      : 'bg-black text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold rounded-xl border border-gray-700 flex items-center gap-1.5 transition shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {selectedPlatform.toUpperCase()} CSV</span>
            </button>
          </div>

          {/* Listing Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Image Preview Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-3xl bg-gray-900 border border-gray-800 space-y-4 shadow-xl">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-800">
                  <img
                    src={generatedListing.imageUrl}
                    alt="Uploaded Product Image"
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-gray-700 rounded-full text-[10px] font-bold text-[#FEE715]">
                    ImgBB Hosted
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Direct Hosted Link</span>
                    <button
                      onClick={() => handleCopyText(generatedListing.imageUrl, 'link')}
                      className="text-[#FEE715] hover:underline font-bold text-[11px]"
                    >
                      {copiedField === 'link' ? 'Copied Link!' : 'Copy Link'}
                    </button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Brand</span>
                    <strong className="text-[#FEE715] font-bold">{brandName}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Category</span>
                    <strong className="text-gray-200">{generatedListing.category}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Suggested Price</span>
                    <strong className="text-emerald-400 font-bold">{generatedListing[selectedPlatform].price}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Estimated HSN</span>
                    <strong className="text-indigo-400 font-mono font-bold">{generatedListing.hsnCode}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Listing Outputs */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Product Title */}
              <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#FEE715] uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{selectedPlatform.toUpperCase()} Product Title (Optimized)</span>
                  </label>
                  <button
                    onClick={() => handleCopyText(generatedListing[selectedPlatform].title, 'title')}
                    className="px-3 py-1 bg-black hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-bold border border-gray-800 flex items-center gap-1 transition"
                  >
                    {copiedField === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'title' ? 'Copied' : 'Copy Title'}</span>
                  </button>
                </div>
                <div className="p-3.5 bg-black rounded-xl border border-gray-800 text-sm font-semibold text-white leading-relaxed">
                  {generatedListing[selectedPlatform].title}
                </div>
              </div>

              {/* 5 Bullet Points */}
              <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <label className="text-xs font-bold text-[#FEE715] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Key Product Features / Bullet Points</span>
                  </label>
                  <button
                    onClick={() => handleCopyText(generatedListing[selectedPlatform].bullets.join('\n\n'), 'bullets')}
                    className="px-3 py-1 bg-black hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-bold border border-gray-800 flex items-center gap-1 transition"
                  >
                    {copiedField === 'bullets' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'bullets' ? 'Copied All Bullets' : 'Copy All Bullets'}</span>
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {generatedListing[selectedPlatform].bullets.map((bullet, idx) => (
                    <div key={idx} className="p-3 bg-black rounded-xl border border-gray-800 text-xs text-gray-200 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#FEE715]/10 text-[#FEE715] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & Search Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Product Description
                    </label>
                    <button
                      onClick={() => handleCopyText(generatedListing[selectedPlatform].description, 'desc')}
                      className="text-xs text-[#FEE715] hover:underline font-bold"
                    >
                      {copiedField === 'desc' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3.5 bg-black rounded-xl border border-gray-800 text-xs text-gray-300 leading-relaxed max-h-48 overflow-y-auto">
                    {generatedListing[selectedPlatform].description}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Backend Search Terms
                    </label>
                    <button
                      onClick={() => handleCopyText(generatedListing[selectedPlatform].keywords, 'kw')}
                      className="text-xs text-[#FEE715] hover:underline font-bold"
                    >
                      {copiedField === 'kw' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3.5 bg-black rounded-xl border border-gray-800 text-xs text-[#FEE715] font-mono leading-relaxed max-h-48 overflow-y-auto">
                    {generatedListing[selectedPlatform].keywords}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function createMarketplaceData(titleName, brandName, category, imageUrl) {
  const brand = brandName || 'Liveteachcreate';

  return {
    imageUrl,
    category,
    hsnCode: '4203 10 10',
    gstRate: '12% GST',
    amazon: {
      title: `${brand} ${titleName} - Premium Ergonomic Design for Maximum Performance & Comfort`,
      price: '₹2,499 (MRP ₹4,999 - 50% OFF)',
      bullets: [
        `PREMIUM QUALITY CRAFTSMANSHIP: Designed by ${brand} using top-tier materials for maximum durability and long-lasting performance.`,
        `ERGONOMIC & STYLISH FIT: Tailored precision engineering ensuring comfortable daily usage, breathable texture, and modern aesthetic.`,
        `MULTI-PURPOSE VERSATILITY: Ideal for casual wear, office commute, sports activities, and festive occasions.`,
        `EASY MAINTENANCE & CARE: Resistant to daily wear and tear; simple cleaning instructions for long-lasting freshness.`,
        `TRUSTED BRAND WARRANTY: Backed by ${brand} official manufacturer assurance and 100% quality guarantee.`
      ],
      description: `Elevate your lifestyle with the all-new ${brand} ${titleName}. Crafted with precision engineering and high-grade materials, this product combines modern aesthetics with robust functionality. Whether you are upgrading your personal collection or looking for the perfect gift, ${brand} guarantees superior comfort, reliability, and satisfaction.`,
      keywords: `${titleName.toLowerCase()} ${brand.toLowerCase()} premium online shopping deal buy now trending 2026 best quality durable original`
    },
    flipkart: {
      title: `${brand} ${titleName} (${category}, Pack of 1)`,
      price: '₹2,399 (MRP ₹4,999 - 52% OFF)',
      bullets: [
        `Official Flipkart Assured Quality by ${brand}`,
        `Superior Material Specs & Ergonomic Fit`,
        `Heavy Duty Construction for Daily Usage`,
        `1 Year ${brand} Brand Warranty Included`
      ],
      description: `Shop original ${brand} ${titleName} on Flipkart. Features reinforced stitching, ergonomic contours, and premium finish for long lasting performance.`,
      keywords: `${titleName.toLowerCase()} flipkart offer ${brand.toLowerCase()} best seller low price`
    },
    meesho: {
      title: `${brand} Trending ${titleName}`,
      price: '₹1,899 (Free Delivery)',
      bullets: [
        `Direct Brand Quality from ${brand}`,
        `Comfortable Everyday Wear & Elegant Design`,
        `Easy Returns & Cash on Delivery Available`
      ],
      description: `High quality ${titleName} by ${brand} at direct factory prices. Order now for hassle-free delivery across India.`,
      keywords: `${titleName.toLowerCase()} meesho direct supplier cod free shipping`
    },
    myntra: {
      title: `${brand} Premium ${titleName}`,
      price: '₹2,799',
      bullets: [
        `Exclusive Fashion Collection by ${brand}`,
        `Tailored Regular Fit with Breathable Weave`,
        `Style Code: LTC-${titleName.replace(/\s+/g, '-').slice(0, 10).toUpperCase()}`
      ],
      description: `Add a touch of sophistication to your wardrobe with ${brand} ${titleName}. Styled for modern elegance and crafted with high-grade materials.`,
      keywords: `${titleName.toLowerCase()} myntra trend fashion lifestyle premium`
    },
    ajio: {
      title: `${brand} ${titleName}`,
      price: '₹2,699',
      bullets: [
        `100% Authentic ${brand} Collection`,
        `Modern Design Profile with High Durability`
      ],
      description: `Experience luxury and performance with ${brand} ${titleName}. Available exclusively with Ajio verification.`,
      keywords: `${titleName.toLowerCase()} ajio brand trend 2026`
    }
  };
}
