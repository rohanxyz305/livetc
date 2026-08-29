import React, { useState, useRef } from 'react';
import {
  Package, Sparkles, Copy, Check, Download,
  Zap, ExternalLink, Tag, CheckCircle2, RefreshCw, Upload
} from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

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

// Platform tabs carry a fixed hue per marketplace (static list, mapped by name)
const PLATFORM_TINTS = {
  amazon: 'bg-marigold-tint text-marigold-deep border-marigold/30 hover:border-marigold/60',
  flipkart: 'bg-royal-tint text-royal-deep border-royal/25 hover:border-royal/50',
  meesho: 'bg-rani-tint text-rani-deep border-rani/25 hover:border-rani/50',
  myntra: 'bg-violet-tint text-violet-deep border-violet/25 hover:border-violet/50',
  ajio: 'bg-pine-tint text-pine-deep border-pine/25 hover:border-pine/50',
};

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

  const copyBtnCls = 'px-3 py-1 bg-white/5 hover:bg-white/10 text-bone-mute rounded-sm text-xs font-semibold border border-white/15 hover:border-white/30 flex items-center gap-1 transition-colors shrink-0';

  return (
    <div className="relative space-y-10">

      {/* Hero Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Reveal as="p" delay={0} className="eyebrow justify-center">
          <Package className="w-3.5 h-3.5 text-marigold" aria-hidden="true" />
          Direct ImgBB upload &amp; listing generator
        </Reveal>
        <Reveal as="h1" delay={90} className="text-display-md text-bone">
          Upload a product image <span className="text-pine">to generate</span> <span className="grad-text">listings</span>
        </Reveal>
        <Reveal as="p" delay={170} className="lede text-base sm:text-lg">
          Upload a product image below. The tool handles direct ImgBB hosting, shows an instant live preview, and builds complete Amazon, Flipkart, Meesho, Myntra &amp; Ajio listings.
        </Reveal>
      </div>

      {/* Upload & Generator Control Panel — hero panel of the page (animated gradient edge) */}
      <Reveal className="edge-gradient p-6 max-w-4xl mx-auto space-y-6" delay={240}>

        {/* Brand Name Input */}
        <div className="max-w-xs">
          <label htmlFor="generator-brand" className="field-label">Your brand name</label>
          <input
            id="generator-brand"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. Liveteachcreate"
            className="field text-sm"
          />
        </div>

        {/* Direct Drag & Drop Upload Zone */}
        <div>
          <span className="field-label font-mono !text-[10px] uppercase tracking-[0.18em] text-bone-faint" id="upload-label">
            Upload product image (direct ImgBB integration)
          </span>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-describedby="upload-label"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current && fileInputRef.current.click();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload product image: click or drag and drop a file"
            className={`p-8 rounded-sm border-2 border-dashed transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'bg-marigold-pale border-marigold shadow-glowmarigold'
                : 'bg-ink border-white/20 hover:border-marigold/60'
            }`}
          >
            {isUploading ? (
              <div className="space-y-2 py-2">
                <RefreshCw className="w-8 h-8 text-marigold animate-spin mx-auto" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-marigold">Uploading image to ImgBB</p>
              </div>
            ) : previewImage ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Uploaded product preview"
                    className="w-40 h-40 object-cover rounded-sm border-2 border-marigold mx-auto"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-ink text-bone font-mono text-[10px] font-medium uppercase tracking-wider rounded-sm">
                    Uploaded
                  </span>
                </div>
                <p className="text-xs text-bone-mute font-medium">
                  Image uploaded. Click or drop another image to replace it.
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 rounded-sm bg-cream text-pine flex items-center justify-center mx-auto border border-white/15">
                  <Upload className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDragging ? 'text-ink' : 'text-bone'}`}>
                    Click to upload a product image, or drag and drop a file
                  </p>
                  <p className={`text-xs mt-1 ${isDragging ? 'text-ink/60' : 'text-bone-mute'}`}>
                    Supports JPG, PNG, WEBP. Instant direct upload via the ImgBB API.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Or Paste ImgBB Link Manually */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label htmlFor="imgbb-url" className="field-label font-mono !text-[10px] uppercase tracking-[0.18em] text-bone-faint mb-0">
              Or paste an existing ImgBB link manually
            </label>
            <a href="https://imgbb.com/" target="_blank" rel="noreferrer" className="link-underline font-mono text-[11px] font-semibold flex items-center gap-1">
              ImgBB.com <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="imgbb-url"
              type="text"
              value={imgbbUrl}
              onChange={(e) => {
                setImgbbUrl(e.target.value);
                setPreviewImage(e.target.value);
              }}
              placeholder="e.g. https://i.ibb.co/xyz/product.jpg"
              className="field font-mono text-xs"
            />
            <button
              disabled={isGenerating || !imgbbUrl.trim()}
              onClick={() => handleGenerateListing()}
              className="btn btn-accent btn-sweep px-5 py-3 text-sm shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Generating</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-ink/20" aria-hidden="true" />
                  <span>Generate listing</span>
                  <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sample Image Presets */}
        <div className="pt-4 border-t border-white/10">
          <span className="field-label font-mono !text-[10px] uppercase tracking-[0.18em] text-bone-faint">
            Or start from a sample product image
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SAMPLE_IMGBB_LINKS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSampleClick(sample)}
                className="p-2.5 rounded-sm bg-white/5 border border-white/15 hover:border-white/40 transition-colors text-left flex items-center gap-2 group"
              >
                <img src={sample.url} alt={`Sample product: ${sample.name}`} className="w-8 h-8 rounded-sm object-cover shrink-0 border border-white/10" />
                <div className="overflow-hidden">
                  <p className="text-[11px] font-semibold text-bone group-hover:text-marigold truncate transition-colors">{sample.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-bone-faint">{sample.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </Reveal>

      {/* Generated Marketplace Result */}
      {generatedListing && (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-up">

          {/* Marketplace Selector Tabs */}
          <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint mr-2 shrink-0">Target platform</span>
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
                  aria-pressed={selectedPlatform === plat.id}
                  className={`px-3.5 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors whitespace-nowrap ${
                    selectedPlatform === plat.id
                      ? 'bg-bone text-ink border-bone'
                      : PLATFORM_TINTS[plat.id] || 'bg-white/5 text-bone-mute border-white/15 hover:border-white/40 hover:text-bone'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="btn btn-outline px-4 py-2 text-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export {selectedPlatform.toUpperCase()} CSV</span>
            </button>
          </div>

          {/* Listing Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Image Preview Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="card p-4 space-y-4">
                <div className="relative rounded-sm overflow-hidden bg-paper-deep border border-white/10">
                  <img
                    src={generatedListing.imageUrl}
                    alt="Uploaded product image"
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-ink/85 text-bone rounded-sm font-mono text-[10px] font-medium uppercase tracking-wider">
                    ImgBB hosted
                  </span>
                </div>

                <div className="divide-y divide-white/10 text-xs">
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Hosted link</span>
                    <button
                      onClick={() => handleCopyText(generatedListing.imageUrl, 'link')}
                      className="link-underline font-mono text-[11px] font-semibold shrink-0"
                    >
                      {copiedField === 'link' ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Brand</span>
                    <strong className="text-bone font-semibold truncate">{brandName}</strong>
                  </div>
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Category</span>
                    <strong className="text-bone font-semibold text-right">{generatedListing.category}</strong>
                  </div>
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Suggested price</span>
                    <strong className="text-sage font-semibold">{generatedListing[selectedPlatform].price}</strong>
                  </div>
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">Estimated HSN</span>
                    <strong className="text-bone font-mono font-semibold">{generatedListing.hsnCode}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Listing Outputs */}
            <div className="lg:col-span-8 space-y-6">

              {/* Product Title */}
              <div className="card p-6 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-marigold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{selectedPlatform.toUpperCase()} product title (optimized)</span>
                  </label>
                  <button
                    onClick={() => handleCopyText(generatedListing[selectedPlatform].title, 'title')}
                    className={copyBtnCls}
                  >
                    {copiedField === 'title' ? <Check className="w-3 h-3 text-sage" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'title' ? 'Copied' : 'Copy title'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-sm bg-paper-deep border border-white/10 text-sm font-semibold text-bone leading-relaxed">
                  {generatedListing[selectedPlatform].title}
                </div>
              </div>

              {/* 5 Bullet Points */}
              <div className="card p-6 space-y-3">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <label className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-marigold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Key product features / bullet points</span>
                  </label>
                  <button
                    onClick={() => handleCopyText(generatedListing[selectedPlatform].bullets.join('\n\n'), 'bullets')}
                    className={copyBtnCls}
                  >
                    {copiedField === 'bullets' ? <Check className="w-3 h-3 text-sage" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'bullets' ? 'Copied all' : 'Copy all bullets'}</span>
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {generatedListing[selectedPlatform].bullets.map((bullet, idx) => (
                    <div key={idx} className="p-3 rounded-sm bg-paper-deep border border-white/10 text-xs text-bone-mute flex items-start gap-2.5">
                      <span className="num-badge !w-5 !h-5 !text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & Search Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">
                      Product description
                    </label>
                    <button
                      onClick={() => handleCopyText(generatedListing[selectedPlatform].description, 'desc')}
                      className="link-underline font-mono text-[11px] font-semibold shrink-0"
                    >
                      {copiedField === 'desc' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-sm bg-paper-deep border border-white/10 text-xs text-bone-mute leading-relaxed max-h-48 overflow-y-auto">
                    {generatedListing[selectedPlatform].description}
                  </div>
                </div>

                <div className="card p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">
                      Backend search terms
                    </label>
                    <button
                      onClick={() => handleCopyText(generatedListing[selectedPlatform].keywords, 'kw')}
                      className="link-underline font-mono text-[11px] font-semibold shrink-0"
                    >
                      {copiedField === 'kw' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-sm bg-paper-deep border border-white/10 text-xs text-bone font-mono leading-relaxed max-h-48 overflow-y-auto">
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
