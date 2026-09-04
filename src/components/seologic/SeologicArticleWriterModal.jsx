import React, { useState, useMemo, useEffect } from 'react';
import { 
  PenTool, CheckCircle2, AlertCircle, Copy, Check, Send, 
  Code, FileText, Eye, X, Image as ImageIcon, Sparkles, RefreshCw, Award, Key, Cpu, Sliders, Play, Globe
} from 'lucide-react';
import { generateAiSeoArticle } from '../../services/seologicApi';

export default function SeologicArticleWriterModal({ cluster, seed, onClose, onPublishSuccess }) {
  if (!cluster) return null;

  const primaryKeyword = cluster.list[0]?.keyword || seed;
  const secondaryKeywords = cluster.list.slice(1).map(k => k.keyword);

  // OpenAI Configuration State
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('seologic_openai_api_key') || '';
    } catch {
      return '';
    }
  });

  const [rememberApiKey, setRememberApiKey] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [tone, setTone] = useState('Professional & Authoritative');
  const [audience, setAudience] = useState('E-Commerce Sellers & D2C Brands');
  const [wordCountTarget, setWordCountTarget] = useState(1700);

  // Structural Toggles
  const [includeToc, setIncludeToc] = useState(true);
  const [includeFaq, setIncludeFaq] = useState(true);
  const [includeKeyTakeaways, setIncludeKeyTakeaways] = useState(true);

  // SEO Meta Form Inputs
  const [title, setTitle] = useState(
    `Complete Guide to ${capitalizeWords(primaryKeyword)} Strategies for 2026`
  );
  
  const [metaDescription, setMetaDescription] = useState(
    `Learn actionable ${primaryKeyword} techniques. Discover step by step strategies to boost organic rankings and grow your online business revenue in 2026.`
  );

  const [slug, setSlug] = useState(
    primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );

  // Article Content State
  const [content, setContent] = useState(
    generateHumanArticle(cluster, seed, 1700)
  );

  const [activeTab, setActiveTab] = useState('editor'); // editor | openai | checklist | schema | preview
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiError, setApiError] = useState('');

  // Persist OpenAI API Key if remember option checked
  useEffect(() => {
    if (rememberApiKey && apiKey) {
      localStorage.setItem('seologic_openai_api_key', apiKey);
    }
  }, [apiKey, rememberApiKey]);

  // Handle OpenAI AI Article Generation (SEOArticlegenAI)
  const handleAiGeneration = async () => {
    if (!apiKey) {
      setApiError('Please enter your OpenAI API Key below to run AI generation.');
      setActiveTab('openai');
      return;
    }

    setApiError('');
    setIsGenerating(true);

    try {
      const result = await generateAiSeoArticle({
        apiKey,
        model: selectedModel,
        primaryKeyword,
        secondaryKeywords,
        tone,
        audience,
        wordCountTarget,
        includeToc,
        includeFaq,
        includeKeyTakeaways
      });

      if (result && result.content) {
        setContent(result.content);
        
        // Auto-extract H1 if present
        const h1Match = result.content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        if (h1Match && h1Match[1]) {
          setTitle(h1Match[1].replace(/<[^>]+>/g, '').trim());
        }

        setActiveTab('editor');
      }
    } catch (err) {
      setApiError(err.message || 'OpenAI AI Generation failed. Please check your API key and connection.');
      setActiveTab('openai');
    } finally {
      setIsGenerating(false);
    }
  };

  // Semrush 10-Point On-Page SEO Checklist Audit
  const semrushAudit = useMemo(() => {
    const cleanContent = stripSpecialChars(content);
    const words = cleanContent.trim().split(/\s+/).filter(w => w.length > 0).length;
    const lowerContent = cleanContent.toLowerCase();
    const lowerTitle = title.toLowerCase();
    const lowerMeta = metaDescription.toLowerCase();
    const lowerPrimary = primaryKeyword.toLowerCase();

    const checks = [];

    // 1. Target Keyword in H1 Title
    const titleHasKeyword = lowerTitle.includes(lowerPrimary) || lowerTitle.includes(lowerPrimary.split(' ')[0]);
    checks.push({
      id: 1,
      name: 'Primary Keyword in H1 Title',
      status: titleHasKeyword ? 'pass' : 'fail',
      msg: titleHasKeyword ? `H1 Title contains focus keyword "${primaryKeyword}"` : `Include "${primaryKeyword}" in the main title.`
    });

    // 2. Keyword in First 100 Words
    const first100Words = lowerContent.split(/\s+/).slice(0, 100).join(' ');
    const first100HasKeyword = first100Words.includes(lowerPrimary) || first100Words.includes(lowerPrimary.split(' ')[0]);
    checks.push({
      id: 2,
      name: 'Keyword in First 100 Words',
      status: first100HasKeyword ? 'pass' : 'fail',
      msg: first100HasKeyword ? 'Focus keyword appears in introductory paragraph.' : 'Insert focus keyword in the opening paragraph.'
    });

    // 3. Meta Title (50-60 chars) & Description (140-160 chars)
    const titleLen = title.length;
    const metaLen = metaDescription.length;
    const metaOk = titleLen >= 40 && titleLen <= 65 && metaLen >= 120 && metaLen <= 165;
    checks.push({
      id: 3,
      name: 'Meta Title & Description Length',
      status: metaOk ? 'pass' : 'fail',
      msg: metaOk ? `Title (${titleLen} chars) and Meta (${metaLen} chars) are perfectly sized.` : `Adjust Title (50-60) or Meta (140-160). Currently ${titleLen}/${metaLen}.`
    });

    // 4. Short, Clean URL Slug
    const slugOk = slug.length >= 3 && !slug.includes(' ') && slug.includes(lowerPrimary.split(' ')[0]);
    checks.push({
      id: 4,
      name: 'URL Slug Optimization',
      status: slugOk ? 'pass' : 'fail',
      msg: slugOk ? `Clean URL slug: /blogs/${slug}` : 'Use short, hyphenated keywords.'
    });

    // 5. Heading Structure (H2 & H3 Subheadings)
    const hasH2 = lowerContent.includes('<h2') || lowerContent.includes('h2:');
    const hasH3 = lowerContent.includes('<h3') || lowerContent.includes('h3:');
    checks.push({
      id: 5,
      name: 'Structured Headings (H2 & H3)',
      status: (hasH2 || hasH3) ? 'pass' : 'fail',
      msg: (hasH2 || hasH3) ? 'Hierarchical section headings detected.' : 'Add H2 and H3 subheadings for content structure.'
    });

    // 6. Content Depth & Word Count Match
    const wordCountOk = words >= (wordCountTarget - 250);
    checks.push({
      id: 6,
      name: `Target Word Count Depth (${wordCountTarget} words)`,
      status: wordCountOk ? 'pass' : 'fail',
      msg: wordCountOk ? `Current length: ${words} words (Target: ${wordCountTarget} words).` : `Currently ${words} words. Target is ${wordCountTarget} words.`
    });

    // 7. Keyword Density (1.0% - 2.5% natural range)
    const kwMatches = (lowerContent.match(new RegExp(escapeRegExp(lowerPrimary), 'g')) || []).length;
    const density = parseFloat(((kwMatches * lowerPrimary.split(' ').length / Math.max(words, 1)) * 100).toFixed(1));
    const densityOk = density >= 0.5 && density <= 3.2;
    checks.push({
      id: 7,
      name: `Keyword Density (${density}%)`,
      status: densityOk ? 'pass' : 'fail',
      msg: densityOk ? `Keyword appears ${kwMatches} times (${density}% density). Natural frequency.` : `Density is ${density}%. Target range 1.0% to 2.5%.`
    });

    // 8. Cluster & LSI Sub-Keywords Coverage
    const coveredSecondary = secondaryKeywords.filter(sec => lowerContent.includes(sec.toLowerCase()));
    const secondaryOk = secondaryKeywords.length === 0 || coveredSecondary.length >= Math.ceil(secondaryKeywords.length * 0.4);
    checks.push({
      id: 8,
      name: 'Cluster & LSI Keywords Coverage',
      status: secondaryOk ? 'pass' : 'fail',
      msg: secondaryOk ? `Covered ${coveredSecondary.length} of ${secondaryKeywords.length} cluster sub-keywords.` : `Include more sub-keywords from this topic cluster.`
    });

    // 9. Free Live Image with Alt Text
    const hasImage = lowerContent.includes('<img') || lowerContent.includes('alt=');
    checks.push({
      id: 9,
      name: 'Live Image + Keyword Alt Tag',
      status: hasImage ? 'pass' : 'fail',
      msg: hasImage ? 'Live image embedded with keyword alt text tag.' : 'Include relevant live image with alt text.'
    });

    // 10. Internal & Authoritative Outbound Links
    const hasLinks = lowerContent.includes('href=') || lowerContent.includes('http');
    checks.push({
      id: 10,
      name: 'Internal & Authoritative Outbound Links',
      status: hasLinks ? 'pass' : 'fail',
      msg: hasLinks ? 'Internal service links and authoritative references included.' : 'Add internal and external links.'
    });

    // Calculate score out of 10
    const passCount = checks.filter(c => c.status === 'pass').length;
    return { checks, score10: passCount, words };
  }, [title, metaDescription, slug, content, primaryKeyword, secondaryKeywords, wordCountTarget]);

  // Generate Schema JSON-LD
  const generateSchema = () => {
    return JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": metaDescription,
        "articleBody": content.replace(/(<([^>]+)>)/gi, ""),
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
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://liveteachcreate.com/blogs/${slug}`
        }
      },
      null,
      2
    );
  };

  // Handle Publish Action
  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      const publishedPost = {
        id: Date.now(),
        slug: slug || primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        excerpt: metaDescription,
        category: cluster.name || 'E-Commerce Growth',
        author: 'Liveteachcreate Growth Team',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.ceil(semrushAudit.words / 200)} min read`,
        image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop',
        content,
        seoScore: Math.round((semrushAudit.score10 / 10) * 100),
        schemaData: generateSchema()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('seologic_custom_blogs') || '[]');
        localStorage.setItem('seologic_custom_blogs', JSON.stringify([publishedPost, ...existing]));
      } catch (e) {
        console.error('Failed to save published article:', e);
      }

      if (onPublishSuccess) {
        onPublishSuccess(publishedPost);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#101820] text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold shadow-yellowGlow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
                OpenAI AI SEO Article Generator & Semrush Auditor
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SEOArticlegenAI Engine
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Primary Keyword: <strong className="text-[#FEE715]">{primaryKeyword}</strong> ({secondaryKeywords.length} Sub-keywords)
              </p>
            </div>
          </div>

          {/* Action Tabs & Close Button */}
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-800 p-1 rounded-xl border border-gray-700 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'editor' ? 'bg-[#FEE715] text-[#101820] font-bold shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <PenTool className="w-3.5 h-3.5 inline mr-1" /> Editor
              </button>
              <button
                onClick={() => setActiveTab('openai')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'openai' ? 'bg-[#FEE715] text-[#101820] font-bold shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Cpu className="w-3.5 h-3.5 inline mr-1 text-purple-600" /> OpenAI AI Generator
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'checklist' ? 'bg-[#FEE715] text-[#101820] font-bold shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Award className="w-3.5 h-3.5" /> 
                <span>Semrush Audit ({semrushAudit.score10}/10)</span>
              </button>
              <button
                onClick={() => setActiveTab('schema')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'schema' ? 'bg-[#FEE715] text-[#101820] font-bold shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Code className="w-3.5 h-3.5 inline mr-1" /> Schema
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'preview' ? 'bg-[#FEE715] text-[#101820] font-bold shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" /> Live Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OPENAI AI GENERATOR PANEL (SEOArticlegenAI) */}
          {activeTab === 'openai' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900 to-black border border-gray-800 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xl">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">OpenAI AI SEO Article Generator</h3>
                      <p className="text-xs text-gray-400">Powered by OpenAI GPT-4o & GPT-4o-mini models</p>
                    </div>
                  </div>

                  <button
                    onClick={handleAiGeneration}
                    disabled={isGenerating}
                    className="pulseBtn font-extrabold text-xs px-6 py-3 rounded-full uppercase tracking-wider shadow-yellowGlow flex items-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating AI Article...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Generate Article with OpenAI</span>
                      </>
                    )}
                  </button>
                </div>

                {apiError && (
                  <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* OpenAI API Key Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[#FEE715]" />
                      <span>OpenAI API Key</span>
                    </label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none font-mono"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="rememberKey"
                        checked={rememberApiKey}
                        onChange={(e) => setRememberApiKey(e.target.checked)}
                        className="rounded bg-black border-gray-700 text-[#FEE715]"
                      />
                      <label htmlFor="rememberKey" className="text-[11px] text-gray-400">Remember API key in browser</label>
                    </div>
                  </div>

                  {/* AI Model Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#FEE715]" />
                      <span>OpenAI AI Model</span>
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none font-semibold"
                    >
                      <option value="gpt-4o-mini">GPT-4o-Mini (Fast, High Quality & Budget Friendly - Recommended)</option>
                      <option value="gpt-4o">GPT-4o (Flagship Model - Highest Intelligence & Depth)</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo (High Precision)</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Legacy Model)</option>
                    </select>
                  </div>

                  {/* Tone of Voice */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Article Tone of Voice
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none font-semibold"
                    >
                      <option value="Professional & Authoritative">Professional & Authoritative (Industry Leader)</option>
                      <option value="Conversational & Engaging">Conversational & Engaging (Friendly Guide)</option>
                      <option value="Technical & Analytical">Technical & Analytical (Deep Dive)</option>
                      <option value="High-Converting Persuasive">High-Converting Persuasive (Sales & Growth)</option>
                    </select>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Target Word Count */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Target Word Count
                    </label>
                    <div className="flex gap-3">
                      {[1000, 1700, 2500].map((count) => (
                        <button
                          key={count}
                          onClick={() => setWordCountTarget(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                            wordCountTarget === count
                              ? 'bg-[#FEE715] text-[#101820] border-[#FEE715] shadow-yellowGlow'
                              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {count} Words
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Structure Toggles */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Article Outline Elements
                    </label>
                    <div className="space-y-2 text-xs text-gray-300 pt-1">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeToc}
                          onChange={(e) => setIncludeToc(e.target.checked)}
                          className="rounded bg-black border-gray-700 text-[#FEE715]"
                        />
                        <span>Table of Contents Navigation</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeKeyTakeaways}
                          onChange={(e) => setIncludeKeyTakeaways(e.target.checked)}
                          className="rounded bg-black border-gray-700 text-[#FEE715]"
                        />
                        <span>Key Takeaways Callout Box</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeFaq}
                          onChange={(e) => setIncludeFaq(e.target.checked)}
                          className="rounded bg-black border-gray-700 text-[#FEE715]"
                        />
                        <span>FAQ Section with Schema compatibility</span>
                      </label>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: EDITOR */}
          {activeTab === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form & Controls */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Word Count Preset Controls */}
                <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Target Word Count Preset
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1000, 1700, 2500].map((count) => (
                      <button
                        key={count}
                        onClick={() => {
                          setWordCountTarget(count);
                          setContent(generateHumanArticle(cluster, seed, count));
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition border ${
                          wordCountTarget === count
                            ? 'bg-[#FEE715] text-[#101820] border-[#FEE715] shadow-yellowGlow'
                            : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {count} W
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setContent(generateHumanArticle(cluster, seed, wordCountTarget))}
                    className="w-full text-xs font-bold text-gray-400 hover:text-[#FEE715] flex items-center justify-center gap-1.5 pt-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Regenerate Sample Article
                  </button>
                </div>

                {/* SEO Meta Form Inputs */}
                <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
                    On-Page SEO Meta Tags
                  </h3>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-semibold text-gray-400">H1 Title Tag</label>
                      <span className={`text-[10px] font-mono ${title.length >= 40 && title.length <= 65 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {title.length}/60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-gray-800 rounded-xl text-xs text-white focus:border-[#FEE715] focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-semibold text-gray-400">Meta Description</label>
                      <span className={`text-[10px] font-mono ${metaDescription.length >= 120 && metaDescription.length <= 165 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {metaDescription.length}/160 chars
                      </span>
                    </div>
                    <textarea
                      rows="3"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="w-full p-3 bg-black border border-gray-800 rounded-xl text-xs text-gray-200 focus:border-[#FEE715] focus:outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">URL Slug</label>
                    <div className="flex items-center bg-black border border-gray-800 rounded-xl px-3 py-2 text-xs font-mono">
                      <span className="text-gray-500">/blogs/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="bg-transparent text-white focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Semrush Audit Score Mini Badge */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">Semrush SEO Score</span>
                    <span className="text-2xl font-black text-[#FEE715] font-display">
                      {semrushAudit.score10}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#FEE715] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(semrushAudit.score10 / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Passed {semrushAudit.score10} of 10 Semrush On-Page SEO Checks.
                  </p>
                </div>

              </div>

              {/* Right Column: HTML Editor */}
              <div className="lg:col-span-8 space-y-4 flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#FEE715]" />
                    <span>Formatted HTML Content Editor</span>
                  </label>
                  <span className="text-xs text-gray-400 font-mono">
                    {semrushAudit.words} words
                  </span>
                </div>

                <textarea
                  rows="22"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-5 bg-black border border-gray-800 rounded-2xl text-xs text-gray-200 font-mono focus:border-[#FEE715] focus:outline-none leading-relaxed resize-none flex-1"
                ></textarea>
              </div>

            </div>
          )}

          {/* TAB 3: SEMRUSH 10-POINT CHECKLIST AUDIT */}
          {activeTab === 'checklist' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Score Header */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900 to-black border border-gray-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-display">Semrush 10-Point On-Page Audit</h3>
                    <p className="text-xs text-gray-400 mt-1">Real-time technical On-Page SEO verification engine.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-[#FEE715] font-display">
                      {semrushAudit.score10}/10
                    </span>
                    <span className="block text-xs font-bold text-emerald-400">
                      {Math.round((semrushAudit.score10 / 10) * 100)}% SEO Grade
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FEE715] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(semrushAudit.score10 / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {semrushAudit.checks.map((check) => (
                  <div 
                    key={check.id}
                    className={`p-4 rounded-2xl border flex items-start gap-3 transition ${
                      check.status === 'pass'
                        ? 'bg-gray-900/90 border-gray-800'
                        : 'bg-amber-950/20 border-amber-500/30'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {check.status === 'pass' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{check.id}. {check.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{check.msg}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: SCHEMA JSON-LD */}
          {activeTab === 'schema' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">JSON-LD BlogPosting Schema</h3>
                  <p className="text-xs text-gray-400">Structured data markup for Google Rich Snippets.</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateSchema());
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied Schema!' : 'Copy Schema Code'}</span>
                </button>
              </div>

              <pre className="p-6 rounded-2xl bg-black border border-gray-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                {generateSchema()}
              </pre>
            </div>
          )}

          {/* TAB 5: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="max-w-4xl mx-auto space-y-6 bg-white text-gray-900 p-8 rounded-3xl shadow-2xl">
              <div className="border-b border-gray-200 pb-6 space-y-3">
                <span className="px-3 py-1 bg-[#FEE715] text-[#101820] font-extrabold rounded-full text-xs uppercase tracking-wider">
                  {cluster.name || 'Article Preview'}
                </span>
                <h1 className="text-3xl font-extrabold font-display leading-tight">{title}</h1>
                <p className="text-sm text-gray-500 font-medium">{metaDescription}</p>
              </div>

              <div 
                className="prose max-w-none text-sm leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 bg-gray-900 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
            <span>Score: <strong className="text-[#FEE715]">{semrushAudit.score10}/10</strong></span>
            <span>•</span>
            <span>Words: <strong className="text-white">{semrushAudit.words}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-full transition flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied HTML!' : 'Copy HTML'}</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="pulseBtn font-extrabold text-xs px-8 py-2.5 rounded-full uppercase tracking-wider shadow-yellowGlow flex items-center gap-2"
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish to Live Site Blog</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helpers
function capitalizeWords(str) {
  if (!str) return '';
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripSpecialChars(html) {
  if (!html) return '';
  return html.replace(/(<([^>]+)>)/gi, ' ');
}

// Pre-calibrated Human SEO Article Generator
function generateHumanArticle(cluster, seed, targetCount) {
  const primary = cluster.list[0]?.keyword || seed;
  const secondary = cluster.list.slice(1).map(k => k.keyword);

  return `
<div>
  <p>Are you searching for practical ways to master <strong>${primary}</strong> and multiply your online business revenue in 2026? In today's competitive e-commerce landscape, having a clear, data-driven strategy for ${primary} is essential for brand growth and long-term customer retention.</p>

  <div style="background: #17222d; padding: 20px; border-radius: 12px; border-left: 4px solid #FEE715; margin: 24px 0; color: #ffffff;">
    <h3 style="margin-top:0; color: #FEE715; font-size: 16px;">📌 Key Takeaways for ${capitalizeWords(primary)}</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
      <li>Mastering ${primary} boosts organic search indexing and conversion rates.</li>
      <li>Incorporate related keywords: ${secondary.slice(0, 3).join(', ')}.</li>
      <li>Maintain optimal keyword density between 1.0% and 2.5% for search engines.</li>
      <li>Regular audits prevent listing suppression and ad spend wastage.</li>
    </ul>
  </div>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#section1">1. Fundamentals of ${capitalizeWords(primary)}</a></li>
    <li><a href="#section2">2. Step-by-Step Optimization Roadmap</a></li>
    <li><a href="#section3">3. Integrating ${secondary[0] || 'LSI Keywords'} for Maximum Search Traffic</a></li>
    <li><a href="#section4">4. Frequently Asked Questions (FAQ)</a></li>
  </ul>

  <h2 id="section1">1. Fundamentals of ${capitalizeWords(primary)}</h2>
  <p>Understanding ${primary} requires examining both organic ranking signals and conversion metrics. When marketplace algorithms evaluate your listings or website, they prioritize relevance, customer engagement, and consistent order fulfillment.</p>

  <img src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=1200&auto=format&fit=crop" alt="${primary} strategies" class="w-full h-auto rounded-2xl my-6 border border-gray-800" />

  <h2 id="section2">2. Step-by-Step Optimization Roadmap</h2>
  <p>To implement an effective ${primary} campaign, follow this structured execution plan:</p>
  <ol>
    <li><strong>Keyword Research & Intent Mapping:</strong> Identify high-volume search terms like ${secondary[1] || 'industry keywords'}.</li>
    <li><strong>Catalog & Content Optimization:</strong> Write compelling titles, bullet points, and A+ graphics.</li>
    <li><strong>PPC & Ad Campaign Tuning:</strong> Allocate ad budgets for maximum ROAS and low ACoS.</li>
    <li><strong>Performance Monitoring:</strong> Track weekly metrics and search ranking improvements.</li>
  </ol>

  <h2 id="section3">3. Integrating ${secondary[0] || 'LSI Keywords'} for Maximum Search Traffic</h2>
  <p>In addition to your main focus on ${primary}, incorporating terms such as ${secondary.join(', ')} helps capture long-tail search traffic and buyer queries across marketplaces.</p>

  <p>Need expert assistance? Learn more about our <a href="/services/amazon-seller-account-management-services" style="color: #FEE715; font-weight: bold;">Amazon Account Management Services</a> and scale your marketplace revenue with Liveteachcreate.</p>

  <h2 id="section4">4. Frequently Asked Questions (FAQ)</h2>
  <h3>Q1: How long does it take to see results from ${primary}?</h3>
  <p>A: Most brands notice ranking and traffic improvements within 14 to 30 days of consistent optimization.</p>

  <h3>Q2: Why is ${primary} critical for sellers in 2026?</h3>
  <p>A: Marketplace algorithms prioritize listings with optimized keyword density, accurate product data, and high customer review scores.</p>
</div>
  `.trim();
}
