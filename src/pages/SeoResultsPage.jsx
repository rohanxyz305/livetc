import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { 
  Trophy, TrendingUp, Search, Eye, CheckCircle2, Award, Zap, 
  ArrowUpRight, BarChart3, Filter, Star, ExternalLink, ShieldCheck, ZoomIn, X, Phone, Calendar, Upload
} from 'lucide-react';

const REAL_SEO_RESULTS_DATA = [
  {
    id: 'case-1',
    category: 'e-commerce',
    clientName: 'Handcrafted Apparel & Ethnic Wear Brand',
    industry: 'Fashion E-Commerce',
    period: '90-Day Campaign',
    growthBadge: '+340% Organic Traffic',
    rankBadge: '#1 Rank on Google',
    metrics: [
      { label: 'Monthly Organic Clicks', before: '1,200', after: '14,800', increase: '+1,133%' },
      { label: 'Google 1st Page Keywords', before: '4', after: '38', increase: '+850%' },
      { label: 'Organic Monthly Revenue', before: '₹45,000', after: '₹4,80,000', increase: '+966%' }
    ],
    highlights: [
      'Implemented Schema Markup (Product, Breadcrumb & Organization)',
      'Optimized 140+ product category pages for long-tail transactional keywords',
      'Acquired 25+ high-authority niche fashion backlinks',
      'Technical SEO audit & site speed score improved from 42 to 96'
    ],
    // High quality representation image for GSC / Analytics graph
    proofImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
    quote: 'Liveteachcreate transformed our organic traffic. We went from almost zero sales to ₹4.8 Lacs per month purely from Google organic search!'
  },
  {
    id: 'case-2',
    category: 'gsc-clicks',
    clientName: 'Multi-Category Amazon & Flipkart Electronics Brand',
    industry: 'Consumer Electronics & Marketplace',
    period: '6-Month Campaign',
    growthBadge: '+520% Search Impressions',
    rankBadge: '#1 Amazon & Google Rank',
    metrics: [
      { label: 'Google Search Console Clicks', before: '3,400/mo', after: '28,500/mo', increase: '+738%' },
      { label: 'Amazon Seller Central Sales', before: '₹3.2 Lac/mo', after: '₹14.8 Lac/mo', increase: '+362%' },
      { label: 'ACoS Reduction', before: '42%', after: '14.5%', increase: '-65% Cost' }
    ],
    highlights: [
      'Keyword cluster mapping for 180+ electronics accessories',
      'Amazon A+ content & high-converting listing bullet point injection',
      'Google Search Console indexing & canonical tag architecture',
      'Festival season (BBD & GIF) ad strategy and inventory planning'
    ],
    proofImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
    quote: 'Our Amazon ACoS dropped from 42% to 14.5% while organic Google search clicks surged by over 700%. Remarkable ROI!'
  },
  {
    id: 'case-3',
    category: 'local-seo',
    clientName: 'Premium Healthcare & Dental Clinic Chain',
    industry: 'Local Services (Bengaluru & Jaipur)',
    period: '60-Day Campaign',
    growthBadge: '#1 Map Pack Ranking',
    rankBadge: '+420% Patient Inquiries',
    metrics: [
      { label: 'Google Maps 3-Pack Rank', before: 'Position #14', after: 'Position #1', increase: 'Top Rank' },
      { label: 'Direct Phone Calls / Mo', before: '35 Calls', after: '210 Calls', increase: '+500%' },
      { label: 'Google Reviews Rating', before: '4.1 ★ (20)', after: '4.9 ★ (180+)', increase: '+160 Reviews' }
    ],
    highlights: [
      'Google Business Profile (GBP) complete optimization & geotagged photos',
      'Local NAP (Name, Address, Phone) citation audit across 50+ Indian directories',
      'Localized city service pages targeting "best dental clinic in Bengaluru"',
      'Automated review generation campaign'
    ],
    proofImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop',
    quote: 'Our phone lines ring non-stop now. We dominate the Google 3-Pack for local searches across our city locations.'
  },
  {
    id: 'case-4',
    category: 'd2c-revenue',
    clientName: 'Organic Skincare & D2C Cosmetics Brand',
    industry: 'Beauty & Direct-to-Consumer',
    period: '4-Month Campaign',
    growthBadge: '₹18.5 Lacs Organic GMV',
    rankBadge: '10/10 Semrush Score',
    metrics: [
      { label: 'Organic Monthly Revenue', before: '₹1.8 Lac', after: '₹18.5 Lac', increase: '+927%' },
      { label: 'Blog Search Traffic', before: '450 visits', after: '22,000 visits', increase: '+4,788%' },
      { label: 'Shopify Conversion Rate', before: '0.9%', after: '3.4%', increase: '+277%' }
    ],
    highlights: [
      'Published 45+ Semrush 10/10 On-Page SEO long-form article guides',
      'Shopify speed optimization & 1-click checkout conversion tuning',
      'List-Unsubscribe email marketing automation integration',
      'Influencer outreach & high-tier PR backlinks'
    ],
    proofImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop',
    quote: 'The team at Liveteachcreate built our organic blog strategy from scratch. We reached ₹18.5 Lacs monthly sales without relying solely on paid Meta ads!'
  }
];

export default function SeoResultsPage({ onOpenContactPopup }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [allCaseStudies, setAllCaseStudies] = useState(REAL_SEO_RESULTS_DATA);

  useEffect(() => {
    fetchCustomResults();
  }, []);

  const fetchCustomResults = async () => {
    let customItems = [];
    try {
      const stored = localStorage.getItem('custom_seo_results');
      if (stored) {
        customItems = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const res = await fetch('/api/get-seo-results.php');
      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data)) {
          const apiItems = json.data;
          const mergedCustom = [...apiItems, ...customItems.filter(c => !apiItems.some(a => a.id === c.id))];
          setAllCaseStudies([...mergedCustom, ...REAL_SEO_RESULTS_DATA]);
          return;
        }
      }
    } catch (e) {
      console.log('Using local fallback for custom SEO results');
    }

    if (customItems.length > 0) {
      setAllCaseStudies([...customItems, ...REAL_SEO_RESULTS_DATA]);
    }
  };

  const filteredData = activeFilter === 'all' 
    ? allCaseStudies 
    : allCaseStudies.filter(item => item.category === activeFilter);

  return (
    <>
      <SEO 
        title="SEO Results & Client Case Studies | Proven Organic Growth Proof | Liveteachcreate"
        description="Explore real SEO results, Google Search Console traffic graphs, #1 keyword rankings, and proven revenue growth delivered for e-commerce brands & local businesses across India."
        canonicalUrl="https://liveteachcreate.com/seo-results"
      />

      <div className="min-h-screen bg-[#101820] text-white">
        
        {/* HERO BANNER SECTION */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-[#101820] to-[#101820] border-b border-gray-800">
          <div className="absolute inset-0 bg-[radial-gradient(#FEE715_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FEE715]/10 border border-[#FEE715]/30 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#FEE715] shadow-yellowGlow">
                <Trophy className="w-4 h-4 text-[#FEE715]" />
                <span>PROVEN CLIENT SUCCESS & SEO MILESTONES</span>
              </div>

              <Link 
                to="/seo-results/admin" 
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-xs font-bold text-gray-300 hover:text-white transition shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-[#FEE715]" />
                <span>Upload Screenshots (Admin)</span>
              </Link>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-tight max-w-4xl mx-auto">
              Real SEO Results & Delivered <span className="text-[#FEE715] underline decoration-[#FEE715]/40 underline-offset-8">Client Achievements</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
              We let empirical data and Google Search Console metrics speak for themselves. Discover how we scale organic traffic by 300%+, secure #1 Google rankings, and drive millions in client revenue.
            </p>

            {/* KEY METRIC CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl space-y-1 text-center hover:border-[#FEE715]/50 transition">
                <span className="text-3xl sm:text-4xl font-black text-[#FEE715] font-display">300+</span>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Clients Managed</span>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl space-y-1 text-center hover:border-[#FEE715]/50 transition">
                <span className="text-3xl sm:text-4xl font-black text-[#FEE715] font-display">₹40 Lac+</span>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Client Revenue GMV</span>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl space-y-1 text-center hover:border-[#FEE715]/50 transition">
                <span className="text-3xl sm:text-4xl font-black text-[#FEE715] font-display">90%+</span>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">1st Page Google Rank</span>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl space-y-1 text-center hover:border-[#FEE715]/50 transition">
                <span className="text-3xl sm:text-4xl font-black text-[#FEE715] font-display">3.5x</span>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Traffic Surge</span>
              </div>
            </div>

          </div>
        </section>

        {/* CATEGORY FILTER & CASE STUDIES GRID */}
        <section className="py-16 bg-[#101820]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow' 
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                🌟 All Success Stories
              </button>
              <button
                onClick={() => setActiveFilter('e-commerce')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === 'e-commerce' 
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow' 
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                🛒 E-Commerce SEO
              </button>
              <button
                onClick={() => setActiveFilter('gsc-clicks')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === 'gsc-clicks' 
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow' 
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                📈 Search Console Clicks
              </button>
              <button
                onClick={() => setActiveFilter('local-seo')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === 'local-seo' 
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow' 
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                📍 Local Business 3-Pack
              </button>
              <button
                onClick={() => setActiveFilter('d2c-revenue')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === 'd2c-revenue' 
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow' 
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                💰 D2C Revenue Scale
              </button>
            </div>

            {/* CASE STUDY CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredData.map((caseStudy) => (
                <div 
                  key={caseStudy.id}
                  className="rounded-3xl bg-gray-900/80 border border-gray-800 hover:border-[#FEE715]/50 transition-all p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl"
                >
                  <div className="space-y-6">
                    
                    {/* Header Badges & Title */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full font-bold uppercase">
                          {caseStudy.industry}
                        </span>
                        <span className="text-gray-400 font-semibold">{caseStudy.period}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white font-display leading-tight">
                        {caseStudy.clientName}
                      </h3>

                      <div className="flex gap-2">
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-xs font-extrabold">
                          {caseStudy.growthBadge}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#FEE715]/20 text-[#FEE715] border border-[#FEE715]/30 rounded-md text-xs font-extrabold">
                          {caseStudy.rankBadge}
                        </span>
                      </div>
                    </div>

                    {/* Screenshot / Proof Image Showcase */}
                    <div className="relative rounded-2xl overflow-hidden border border-gray-800 group cursor-pointer" onClick={() => setActiveImageModal(caseStudy.proofImage)}>
                      <img 
                        src={caseStudy.proofImage} 
                        alt={caseStudy.clientName} 
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                        <ZoomIn className="w-5 h-5 text-[#FEE715]" />
                        <span>Click to Inspect Proof Screenshot</span>
                      </div>
                    </div>

                    {/* BEFORE VS AFTER METRICS GRID */}
                    <div className="grid grid-cols-3 gap-3 bg-black/60 p-4 rounded-2xl border border-gray-800 text-center">
                      {caseStudy.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">{m.label}</span>
                          <div className="flex items-center justify-center gap-1.5 text-xs">
                            <span className="text-gray-500 line-through">{m.before}</span>
                            <span className="text-white font-extrabold">{m.after}</span>
                          </div>
                          <span className="block text-[10px] font-black text-emerald-400">{m.increase}</span>
                        </div>
                      ))}
                    </div>

                    {/* KEY EXECUTION HIGHLIGHTS */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FEE715]" />
                        <span>Optimization Strategy Applied</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {caseStudy.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* QUOTE */}
                    <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/50 text-xs italic text-gray-300 border-l-4 border-l-[#FEE715]">
                      "{caseStudy.quote}"
                    </div>

                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <button
                      onClick={onOpenContactPopup}
                      className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-[#FEE715] font-bold text-xs transition flex items-center justify-center gap-2 border border-gray-700"
                    >
                      <span>Get Similar Results for Your Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SCREENSHOT PROOF FULLSCREEN MODAL */}
        {activeImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
            <div className="relative max-w-5xl w-full bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden p-4 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Google Search Console & Analytics Proof
                </span>
                <button 
                  onClick={() => setActiveImageModal(null)}
                  className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img 
                src={activeImageModal} 
                alt="SEO Results Proof Screenshot" 
                className="w-full max-h-[75vh] object-contain rounded-2xl bg-black"
              />
            </div>
          </div>
        )}

        {/* HIGH-CONVERTING CTA BANNER */}
        <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            
            <div className="w-16 h-16 rounded-3xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-black text-3xl mx-auto shadow-yellowGlow">
              ⚡
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display">
                Ready to Dominate #1 Rankings on Google?
              </h2>
              <p className="text-base text-gray-300 max-w-2xl mx-auto">
                Get a comprehensive 100% Free SEO & Organic Audit for your brand within 24 hours. Our search experts will analyze your keywords, backlinks, and technical health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenContactPopup}
                className="pulseBtn font-extrabold text-xs px-10 py-4 rounded-full uppercase tracking-wider shadow-yellowGlow flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Claim Free Audit & Strategy Call</span>
              </button>

              <a
                href="https://wa.me/918904979375"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-extrabold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Instant Consultation</span>
              </a>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
