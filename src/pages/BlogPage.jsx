import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';

const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-boost-sales-in-flipkart-big-billion-days-2026",
    title: "How to Boost Sales in Flipkart Big Billion Days in 2026 (Ultimate 1300+ Word Blueprint)",
    category: "Flipkart Strategy",
    date: "August 28, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop",
    summary: "Master inventory planning, Flipkart PLA advertising, Smart Fulfillment (FBF), Price Lock mechanics, and catalog readiness to maximize Big Billion Days revenue.",
    content: `
<div>
  <img src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop" alt="Flipkart Big Billion Days Strategy" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <h2>1. Catalog & Listing Optimization (45 Days Before BBD)</h2>
  <p>Your catalog quality score directly influences Flipkart search ranking algorithm during high traffic surges.</p>
  <ul style="line-height:1.8;">
    <li><strong>Title Keyword Injection:</strong> Ensure primary search phrases appear within the first 60 characters.</li>
    <li><strong>Infographics & Lifestyle Images:</strong> Replace plain white background thumbnails with multi angle lifestyle images.</li>
    <li><strong>Attributes Completeness Score:</strong> Achieve 100% completion on all optional product attributes.</li>
  </ul>

  <h2>2. Inventory Planning & Fulfillment Strategy</h2>
  <p>Stockouts during BBD are catastrophic. Transit 60% to 70% of projected BBD inventory into Flipkart regional warehouses at least 25 days before launch.</p>
  
  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="E-Commerce Fulfillment & Warehousing" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />
</div>
    `
  },
  {
    id: 2,
    slug: "how-to-increase-sales-in-amazon-great-indian-festival-2026",
    title: "How to Increase Sales in Amazon Great Indian Festival in 2026 (Ultimate Master Playbook)",
    category: "Amazon PPC & FBA",
    date: "August 27, 2026",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop",
    summary: "Comprehensive guide to dominating Amazon GIF 2026: Lightning Deals, A+ Brand Store, Sponsored Products PPC optimization, and Prime inventory routing.",
    content: `
<div>
  <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop" alt="Amazon Great Indian Festival Strategy" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <h2>1. Prime Eligibility & FBA Inbound Planning</h2>
  <p>During the Great Indian Festival, non-Prime listings suffer a severe conversion drop. Buyers prioritize Prime badged products with free 1 day delivery.</p>

  <h2>2. A+ Content & Brand Store Revamp</h2>
  <p>Highlighting festive gift packaging and premium quality elevates conversion rates by up to 30%.</p>
</div>
    `
  },
  {
    id: 3,
    slug: "how-to-onboard-product-in-quick-commerce",
    title: "How to Onboard Products in Quick Commerce (Blinkit, Swiggy Instamart, Zepto)",
    category: "Quick Commerce",
    date: "August 25, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop",
    summary: "Step-by-step master guide for vendor registration, FSSAI compliance, dark store inventory mapping, and PO management on 10-minute delivery apps.",
    content: `
<div>
  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop" alt="Quick Commerce Onboarding Blinkit Zepto" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <h2>Step 1: Legal & Regulatory Documentation Checklist</h2>
  <p>Prepare GST registration, FSSAI license, and brand authorization letters before submitting vendor applications.</p>
</div>
    `
  },
  {
    id: 4,
    slug: "zepto-marketing-strategy-to-win-customer-mind",
    title: "Zepto Marketing Strategy: Winning Customer Minds in the 10-Minute Economy",
    category: "Marketplace Growth",
    date: "August 22, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop",
    summary: "Deconstructing Zepto hyper-local marketing engine: micro-warehouse density, impulse buy mechanics, in-app banner placement, and notification funnels.",
    content: `
<div>
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop" alt="Zepto Hyperlocal Marketing Strategy" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <h2>1. The Psychology of Instant Gratification</h2>
  <p>Zepto entire brand messaging revolves around eliminating waiting times and instant micro warehouse availability.</p>
</div>
    `
  }
];

// Helper to normalize slugs for matching spaces, hyphens & URI components
function normalizeSlug(str) {
  if (!str) return '';
  return decodeURIComponent(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Fallback Article Generator for any newly requested dynamic blog URL
function generateFallbackArticle(rawSlug) {
  const cleanTitle = decodeURIComponent(rawSlug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return {
    id: `dyn-${Date.now()}`,
    slug: normalizeSlug(rawSlug),
    title: `${cleanTitle}: Complete Growth Strategy & Blueprint (2026)`,
    category: "E-Commerce & SEO",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop",
    summary: `Comprehensive guide and strategic breakdown for ${cleanTitle}. Learn actionable techniques to scale your marketplace revenue and organic search rankings.`,
    content: `
<div>
  <img src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop" alt="${cleanTitle} strategy" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <p>Welcome to Liveteachcreate's official strategy breakdown on <strong>${cleanTitle}</strong>. Scaling your marketplace listings and brand presence in 2026 requires data-driven optimization, accurate inventory management, and structured search visibility.</p>

  <div style="background: #17222d; padding: 24px; border-radius: 16px; border-left: 5px solid #FEE715; margin: 28px 0; color: #ffffff;">
    <h3 style="margin-top:0; color: #FEE715; font-size: 18px;">📌 Key Action Points for ${cleanTitle}</h3>
    <ul style="margin: 12px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
      <li>Optimize product titles, bullet points, and backend search terms.</li>
      <li>Maintain competitive pricing and leverage festive promotional deals.</li>
      <li>Improve catalog quality scores to rank higher in marketplace search algorithms.</li>
      <li>Utilize targeted PPC advertising to capture high-intent buyer traffic.</li>
    </ul>
  </div>

  <h2>1. Market Analysis & Growth Strategy</h2>
  <p>Marketplace algorithms prioritize listings with strong conversion rates, positive customer reviews, and fast delivery badges. When optimizing for ${cleanTitle}, focus on bullet point clarity and high-resolution lifestyle images.</p>

  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="${cleanTitle} analytics" style="width:100%; height:auto; border-radius:1rem; margin:1.5rem 0; display:block; border:1px solid #374151;" />

  <h2>2. Step-by-Step Execution Plan</h2>
  <ol style="line-height: 1.8;">
    <li><strong>Keyword Alignment:</strong> Conduct weekly search query audits to identify top buyer search phrases.</li>
    <li><strong>Listing Enrichment:</strong> Add A+ Content, infographics, and detailed product specifications.</li>
    <li><strong>Inventory Allocation:</strong> Route stock into regional fulfillment centers ahead of surge events.</li>
    <li><strong>Ad Campaign Management:</strong> Monitor ACoS and daily ad spend to maintain profitability.</li>
  </ol>

  <h2>3. Expert Assistance & Account Scaling</h2>
  <p>Want experts to manage your seller account? Learn more about our <a href="/services/amazon-seller-account-management-services" style="color: #FEE715; font-weight: bold;">E-Commerce Seller Account Management Services</a> at Liveteachcreate.</p>
</div>
    `.trim()
  };
}

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState(DEFAULT_BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);

  // Load published articles from LocalStorage on mount
  useEffect(() => {
    try {
      const custom1 = JSON.parse(localStorage.getItem('seologic_custom_blogs') || '[]');
      const custom2 = JSON.parse(localStorage.getItem('seologic_published_articles') || '[]');
      const combinedCustom = [...custom1, ...custom2];

      if (Array.isArray(combinedCustom) && combinedCustom.length > 0) {
        // De-duplicate custom posts by slug
        const uniqueCustom = [];
        const seenSlugs = new Set();
        combinedCustom.forEach(post => {
          const norm = normalizeSlug(post.slug);
          if (norm && !seenSlugs.has(norm)) {
            seenSlugs.add(norm);
            uniqueCustom.push({ 
              ...post, 
              slug: norm,
              image: post.image || 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop'
            });
          }
        });

        setAllPosts([...uniqueCustom, ...DEFAULT_BLOG_POSTS]);
      }
    } catch (e) {
      console.error('Error loading published articles', e);
    }
  }, []);

  // Sync selected article with URL slug param /blogs/:slug
  useEffect(() => {
    if (slug) {
      const targetNorm = normalizeSlug(slug);
      let found = allPosts.find(p => normalizeSlug(p.slug) === targetNorm);

      if (!found) {
        found = allPosts.find(p => {
          const pNorm = normalizeSlug(p.slug);
          return pNorm.includes(targetNorm) || targetNorm.includes(pNorm);
        });
      }

      if (found) {
        setSelectedPost(found);
      } else {
        setSelectedPost(generateFallbackArticle(slug));
      }
    } else {
      setSelectedPost(null);
    }
  }, [slug, allPosts]);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    navigate(`/blogs/${normalizeSlug(post.slug)}`);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigate('/blogs');
  };

  // Generate BlogPosting JSON-LD Schema for Google Search Console Indexation
  const blogSchema = selectedPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": selectedPost.title,
    "description": selectedPost.summary || selectedPost.metaDescription || selectedPost.excerpt,
    "image": selectedPost.image || "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://liveteachcreate.com/blogs/${selectedPost.slug}`
    },
    "author": {
      "@type": "Organization",
      "name": "Liveteachcreate",
      "url": "https://liveteachcreate.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Liveteachcreate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://liveteachcreate.com/msme-logo.png"
      }
    },
    "datePublished": "2026-08-29"
  } : null;

  return (
    <>
      <SEO 
        title={selectedPost ? `${selectedPost.title} | Liveteachcreate` : "E-Commerce Growth Blog & Knowledge Hub"}
        description={selectedPost ? selectedPost.summary || selectedPost.metaDescription || selectedPost.excerpt : "Read comprehensive SEO guides, Flipkart Big Billion Days strategies, Amazon GIF playbooks, and published SEO articles on Liveteachcreate Knowledge Hub."}
        canonicalUrl={selectedPost ? `https://liveteachcreate.com/blogs/${selectedPost.slug}` : "https://liveteachcreate.com/blogs"}
        schemaData={blogSchema}
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
                onClick={handleBackToList}
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
                      Semrush Score: {selectedPost.seoScore}/100
                    </span>
                  )}
                </div>
                
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                  {selectedPost.title}
                </h1>
                
                {(selectedPost.summary || selectedPost.metaDescription || selectedPost.excerpt) && (
                  <p className="text-sm text-gray-300 italic border-l-2 border-[#FEE715] pl-4 py-1">
                    {selectedPost.summary || selectedPost.metaDescription || selectedPost.excerpt}
                  </p>
                )}
              </div>

              {/* Featured Header Banner Image */}
              {selectedPost.image && (
                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-[350px] object-cover block"
                  />
                </div>
              )}

              {/* Rendered Article HTML Body with Forced Visible Images */}
              <div className="prose prose-invert max-w-none text-gray-200 text-sm leading-relaxed space-y-6 font-sans [&_img]:block [&_img]:w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:my-6 [&_img]:border [&_img]:border-gray-800 [&_img]:shadow-xl">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </div>

              <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
                <button
                  onClick={handleBackToList}
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
                <article key={post.id || idx} className="p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 shadow-lg hover:border-[#FEE715]/60 transition-all space-y-4 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-4">
                    
                    {/* Featured Thumbnail Image */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden h-48 border border-gray-800">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] rounded-full font-bold uppercase border border-[#FEE715]/20">
                        {post.category || post.clusterName || 'SEO & Content'}
                      </span>
                      <span>{post.date || post.publishedAt}</span>
                    </div>
                    
                    <h3 
                      onClick={() => handleOpenPost(post)}
                      className="text-xl font-bold text-white font-display hover:text-[#FEE715] cursor-pointer transition-colors leading-snug"
                    >
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {post.summary || post.metaDescription || post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">{post.readTime || `${Math.ceil((post.wordCount || 1000)/200)} min read`}</span>
                    <button
                      onClick={() => handleOpenPost(post)}
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
