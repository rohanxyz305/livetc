import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal.jsx';

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

/* Accent rotation for category chips — marigold · pine · rani · violet · royal */
const CATEGORY_TINTS = [
  'border-marigold/30 bg-marigold-tint text-marigold-deep',
  'border-pine/30 bg-pine-tint text-pine-deep',
  'border-rani/30 bg-rani-tint text-rani-deep',
  'border-violet/30 bg-violet-tint text-violet-deep',
  'border-royal/30 bg-royal-tint text-royal-deep',
];
const categoryTint = (i) => CATEGORY_TINTS[((i % 5) + 5) % 5];

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState(DEFAULT_BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);

  // Load published articles from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seologic_published_articles');
      if (stored) {
        const userArticles = JSON.parse(stored);
        if (Array.isArray(userArticles) && userArticles.length > 0) {
          setAllPosts([...userArticles, ...DEFAULT_BLOG_POSTS]);
        }
      }
    } catch (e) {
      console.error('Error loading published articles', e);
    }
  }, []);

  // Sync selected article with URL slug param /blogs/:slug
  useEffect(() => {
    if (slug) {
      const found = allPosts.find(p => p.slug.toLowerCase() === slug.toLowerCase());
      if (found) {
        setSelectedPost(found);
      } else {
        setSelectedPost(null);
      }
    } else {
      setSelectedPost(null);
    }
  }, [slug, allPosts]);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    navigate(`/blogs/${post.slug}`);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigate('/blogs');
  };

  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);
  const selectedIdx = selectedPost
    ? allPosts.findIndex((p) => p.slug.toLowerCase() === selectedPost.slug.toLowerCase())
    : -1;

  const articleBodyStyles = [
    '[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-bone',
    '[&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-bone-mute',
    '[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2',
    '[&_li]:leading-relaxed [&_li]:text-bone-mute',
    '[&_strong]:font-semibold [&_strong]:text-bone',
  ].join(' ');

  return (
    <>
      <SEO
        title={selectedPost ? `${selectedPost.title} | Liveteachcreate Blog` : "E-Commerce Growth Blog & Knowledge Hub | Liveteachcreate"}
        description={selectedPost ? selectedPost.summary || selectedPost.metaDescription : "Read comprehensive SEO guides, Flipkart Big Billion Days strategies, Amazon GIF playbooks, and published SEO articles on Liveteachcreate Knowledge Hub."}
      />

      {/* Page header */}
      <header className="shell pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Reveal>
          <p className="eyebrow">Industry insights &amp; published articles</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-display-lg font-display text-bone">
            Liveteachcreate <span className="grad-text">Knowledge</span> Hub
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-5 max-w-2xl">
            In-depth guides, 1,300+ word strategy blueprints, quick-commerce onboarding steps, and
            SEO-optimized published articles.
          </p>
        </Reveal>
        <div className="mt-12 border-t border-white/15" />
      </header>

      {selectedPost ? (
        /* Full Article Detail View */
        <section className="pb-20 sm:pb-24">
          <div className="shell">
            <article className="card mx-auto max-w-3xl p-6 sm:p-10 lg:p-12">
              <Reveal>
                <button type="button" onClick={handleBackToList} className="btn btn-outline">
                  <i className="fas fa-arrow-left" aria-hidden="true"></i>
                  Back to all articles
                </button>

                <div className="mt-8 border-b border-white/15 pb-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className={`chip ${categoryTint(selectedIdx)}`}>
                      {selectedPost.category || selectedPost.clusterName || 'SEO & Marketing'}
                    </span>
                    <span className="font-mono text-xs text-bone-faint">
                      {selectedPost.date || selectedPost.publishedAt}
                    </span>
                    <span className="font-mono text-xs text-bone-faint">
                      {selectedPost.readTime || `${Math.ceil((selectedPost.wordCount || 1000) / 200)} min read`}
                    </span>
                    {selectedPost.seoScore && (
                      <span className="inline-flex items-center rounded-full border border-sage/30 bg-sage/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-sage">
                        Semrush score: {selectedPost.seoScore}/10
                      </span>
                    )}
                  </div>

                  <h1 className="mt-5 text-display-lg font-display text-bone">
                    {selectedPost.title}
                  </h1>

                  {selectedPost.metaDescription && (
                    <p className="mt-5 border-l-2 border-marigold-deep pl-4 font-display text-lg italic leading-relaxed text-bone-mute">
                      {selectedPost.metaDescription}
                    </p>
                  )}
                </div>
              </Reveal>

              {/* Rendered Article HTML Body */}
              <div className={`mt-8 max-w-none text-base text-bone-mute ${articleBodyStyles}`}>
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </div>

              <div className="mt-10 border-t border-white/15 pt-8">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="link-underline inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <i className="fas fa-arrow-left" aria-hidden="true"></i>
                  Return to articles list
                </button>
              </div>
            </article>
          </div>
        </section>
      ) : (
        /* Articles List View */
        <>
          {/* Featured post — wide card */}
          <section className="pb-20 sm:pb-24">
            <div className="shell">
              {featuredPost && (
                <Reveal>
                  <article
                    key={featuredPost.id || 0}
                    className="card edge-gradient pop-hover grid grid-cols-1 overflow-hidden lg:grid-cols-12"
                  >
                    <div className="flex flex-col justify-between gap-8 border-b border-white/10 bg-paper-soft p-8 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r">
                      <div className="space-y-4">
                        <span className={`chip ${categoryTint(0)}`}>
                          {featuredPost.category || featuredPost.clusterName || 'SEO & Content'}
                        </span>
                        <p className="font-mono text-xs text-bone-faint">
                          {featuredPost.date || featuredPost.publishedAt}
                        </p>
                        <p className="font-mono text-xs text-bone-faint">
                          {featuredPost.readTime || `${Math.ceil((featuredPost.wordCount || 1000) / 200)} min read`}
                        </p>
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">
                        Latest publication
                      </p>
                    </div>

                    <div className="flex flex-col p-8 sm:p-10 lg:col-span-8">
                      <h2
                        onClick={() => handleOpenPost(featuredPost)}
                        className="cursor-pointer text-display-md font-display text-bone transition-colors hover:text-pine"
                      >
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 max-w-2xl leading-relaxed text-bone-mute">
                        {featuredPost.summary || featuredPost.metaDescription}
                      </p>
                      <div className="mt-auto pt-8">
                        <button
                          type="button"
                          onClick={() => handleOpenPost(featuredPost)}
                          className="link-underline inline-flex items-center gap-2 text-sm font-semibold"
                        >
                          Read article
                          <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )}
            </div>
          </section>

          {/* Remaining posts — ledger rows */}
          <section className="well band">
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Reveal>
                    <p className="eyebrow">All articles</p>
                  </Reveal>
                  <Reveal delay={100}>
                    <h2 className="mt-4 text-display-md font-display text-bone">More from the hub</h2>
                  </Reveal>
                </div>
                <p className="font-mono text-xs text-bone-faint">
                  {remainingPosts.length} {remainingPosts.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              <div className="mt-10 border-b border-white/15">
                {remainingPosts.map((post, idx) => (
                  <Reveal
                    as="article"
                    key={post.id || idx}
                    delay={(idx % 6) * 80}
                    className="group pop-hover grid grid-cols-1 gap-4 border-t border-white/10 hover:bg-white/[0.03] py-8 md:grid-cols-[11rem_1fr_auto] md:gap-8"
                  >
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-bone-faint">
                        {post.date || post.publishedAt}
                      </p>
                      <span className={`chip ${categoryTint(idx)}`}>
                        {post.category || post.clusterName || 'SEO & Content'}
                      </span>
                    </div>

                    <div>
                      <h3>
                        <button
                          type="button"
                          onClick={() => handleOpenPost(post)}
                          className="text-left font-display text-lg font-semibold leading-snug text-bone transition-colors group-hover:text-pine sm:text-xl"
                        >
                          {post.title}
                        </button>
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-mute line-clamp-2">
                        {post.summary || post.metaDescription}
                      </p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                        {post.readTime || `${Math.ceil((post.wordCount || 1000) / 200)} min read`}
                      </p>
                    </div>

                    <div className="self-start md:self-center">
                      <button
                        type="button"
                        onClick={() => handleOpenPost(post)}
                        className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold"
                      >
                        Read article
                        <i className="fas fa-arrow-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
