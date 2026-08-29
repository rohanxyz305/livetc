import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';

const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-boost-sales-in-flipkart-big-billion-days-2026",
    title: "How to Boost Sales in Flipkart Big Billion Days in 2026 (Ultimate 1300+ Word Blueprint)",
    category: "Flipkart Strategy",
    date: "August 28, 2026",
    readTime: "12 min read",
    summary: "Master inventory planning, Flipkart PLA advertising, Smart Fulfillment (FBF), Price Lock mechanics, and catalog readiness to maximize Big Billion Days revenue.",
    content: `
<h2>1. Catalog & Listing Optimization (45 Days Before BBD)</h2>
<p>Your catalog quality score directly influences Flipkart search ranking algorithm during high traffic surges.</p>
<ul class="list-disc pl-6 space-y-2">
  <li><strong>Title Keyword Injection:</strong> Ensure primary search phrases appear within the first 60 characters.</li>
  <li><strong>Infographics & Lifestyle Images:</strong> Replace plain white background thumbnails with multi angle lifestyle images.</li>
  <li><strong>Attributes Completeness Score:</strong> Achieve 100% completion on all optional product attributes.</li>
</ul>

<h2>2. Inventory Planning & Fulfillment Strategy</h2>
<p>Stockouts during BBD are catastrophic. Transit 60% to 70% of projected BBD inventory into Flipkart regional warehouses at least 25 days before launch.</p>
    `
  },
  {
    id: 2,
    slug: "how-to-increase-sales-in-amazon-great-indian-festival-2026",
    title: "How to Increase Sales in Amazon Great Indian Festival in 2026 (Ultimate Master Playbook)",
    category: "Amazon PPC & FBA",
    date: "August 27, 2026",
    readTime: "14 min read",
    summary: "Comprehensive guide to dominating Amazon GIF 2026: Lightning Deals, A+ Brand Store, Sponsored Products PPC optimization, and Prime inventory routing.",
    content: `
<h2>1. Prime Eligibility & FBA Inbound Planning</h2>
<p>During the Great Indian Festival, non-Prime listings suffer a severe conversion drop. Buyers prioritize Prime badged products with free 1 day delivery.</p>

<h2>2. A+ Content & Brand Store Revamp</h2>
<p>Highlighting festive gift packaging and premium quality elevates conversion rates by up to 30%.</p>
    `
  },
  {
    id: 3,
    slug: "how-to-onboard-product-in-quick-commerce",
    title: "How to Onboard Products in Quick Commerce (Blinkit, Swiggy Instamart, Zepto)",
    category: "Quick Commerce",
    date: "August 25, 2026",
    readTime: "8 min read",
    summary: "Step-by-step master guide for vendor registration, FSSAI compliance, dark store inventory mapping, and PO management on 10-minute delivery apps.",
    content: `
<h2>Step 1: Legal & Regulatory Documentation Checklist</h2>
<p>Prepare GST registration, FSSAI license, and brand authorization letters before submitting vendor applications.</p>
    `
  },
  {
    id: 4,
    slug: "zepto-marketing-strategy-to-win-customer-mind",
    title: "Zepto Marketing Strategy: Winning Customer Minds in the 10-Minute Economy",
    category: "Marketplace Growth",
    date: "August 22, 2026",
    readTime: "9 min read",
    summary: "Deconstructing Zepto hyper-local marketing engine: micro-warehouse density, impulse buy mechanics, in-app banner placement, and notification funnels.",
    content: `
<h2>1. The Psychology of Instant Gratification</h2>
<p>Zepto entire brand messaging revolves around eliminating waiting times and instant micro warehouse availability.</p>
    `
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [allPosts, setAllPosts] = useState(DEFAULT_BLOG_POSTS);
  const location = useLocation();

  // Load published articles from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seologic_published_articles');
      if (stored) {
        const userArticles = JSON.parse(stored);
        if (Array.isArray(userArticles) && userArticles.length > 0) {
          // Merge user published articles at the top of the blog feed
          setAllPosts([...userArticles, ...DEFAULT_BLOG_POSTS]);
        }
      }
    } catch (e) {
      console.error('Error loading published articles from localStorage', e);
    }
  }, []);

  // Check URL query param e.g. ?published=slug to open the post directly
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pubSlug = queryParams.get('published');
    if (pubSlug) {
      const found = allPosts.find(p => p.slug === pubSlug);
      if (found) {
        setSelectedPost(found);
      }
    }
  }, [location.search, allPosts]);

  return (
    <>
      <SEO 
        title="E-Commerce Growth Blog & Knowledge Hub | Liveteachcreate" 
        description="Read comprehensive SEO guides, Flipkart Big Billion Days strategies, Amazon GIF playbooks, and published SEO articles on Liveteachcreate Knowledge Hub." 
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-yellowGlow">
            Industry Insights & Published Articles
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Liveteachcreate Knowledge Hub
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            In-depth guides, 1,300+ word strategy blueprints, quick-commerce onboarding steps, and SEO-optimized published articles.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {selectedPost ? (
            /* Full Article Detail View */
            <div className="max-w-4xl mx-auto space-y-8 bg-gray-900/60 p-8 sm:p-12 rounded-3xl border border-gray-800 shadow-2xl">
              
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEE715] text-[#101820] rounded-xl font-bold text-xs hover:bg-[#e0ca00] transition-colors shadow-yellowGlow"
              >
                ← Back to All Articles
              </button>

              <div className="space-y-4 border-b border-gray-800 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full font-bold uppercase">
                    {selectedPost.category || selectedPost.clusterName || 'SEO & Marketing'}
                  </span>
                  <span className="text-gray-400">{selectedPost.date || selectedPost.publishedAt}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-[#FEE715] font-semibold">{selectedPost.readTime || `${Math.ceil((selectedPost.wordCount || 1000)/200)} min read`}</span>
                  {selectedPost.seoScore && (
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold">
                      Semrush Score: {selectedPost.seoScore}/10
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                  {selectedPost.title}
                </h1>
                {selectedPost.metaDescription && (
                  <p className="text-sm text-gray-300 italic border-l-2 border-[#FEE715] pl-4 py-1">
                    {selectedPost.metaDescription}
                  </p>
                )}
              </div>

              {/* Rendered Article HTML Body */}
              <div className="prose prose-invert max-w-none text-gray-200 text-sm leading-relaxed space-y-6 font-sans">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </div>

              <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-bold text-[#FEE715] hover:underline"
                >
                  ← Return to Articles List
                </button>
              </div>
            </div>
          ) : (
            /* Articles Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allPosts.map((post, idx) => (
                <article key={post.id || idx} className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 shadow-lg hover:border-[#FEE715]/60 transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] rounded-full font-bold uppercase border border-[#FEE715]/20">
                        {post.category || post.clusterName || 'SEO & Content'}
                      </span>
                      <span>{post.date || post.publishedAt}</span>
                    </div>
                    
                    <h3 
                      onClick={() => setSelectedPost(post)}
                      className="text-xl font-bold text-white font-display hover:text-[#FEE715] cursor-pointer transition-colors leading-snug"
                    >
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {post.summary || post.metaDescription}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">{post.readTime || `${Math.ceil((post.wordCount || 1000)/200)} min read`}</span>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-bold text-[#FEE715] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
