import React from 'react';
import { Compass, ExternalLink, Sparkles, Globe } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

export default function SeologicSERP({ targetKeyword = '' }) {
  const keyword = targetKeyword || 'amazon seller account management services';

  const mockSerpResults = [
    {
      title: `10 Best ${keyword.split(' ')[0]} Services & Agencies (2026 Review)`,
      url: `https://liveteachcreate.com/services/${keyword.replace(/\s+/g, '-')}`,
      breadcrumb: 'liveteachcreate.com › services › agency',
      snippet: `Discover top rated ${keyword} by Liveteachcreate. Boost sales GMV across Amazon, Flipkart, Meesho & Blinkit.`,
      dr: 86,
      backlinks: '12.4K',
      intentTag: 'COMMERCIAL'
    },
    {
      title: `${keyword.toUpperCase()} - Seller Central Growth Guide`,
      url: `https://www.capterra.com/search?q=${encodeURIComponent(keyword)}`,
      breadcrumb: 'capterra.com › software › agency',
      snippet: `Compare verified client reviews and services for ${keyword}. Learn how top brands scale marketplace revenue.`,
      dr: 91,
      backlinks: '42.8K',
      intentTag: 'BUY'
    },
    {
      title: `Complete Beginner Guide to ${keyword}`,
      url: `https://www.hubspot.com/resources/${keyword.replace(/\s+/g, '-')}`,
      breadcrumb: 'hubspot.com › resources › guide',
      snippet: `Everything you need to know about ${keyword}. Includes step-by-step instructions and strategy blueprints.`,
      dr: 93,
      backlinks: '105.1K',
      intentTag: 'INFO'
    }
  ];

  // Intent tag accents mapped by intent type (not index)
  const intentTagCls = {
    INFO: 'bg-royal-tint text-royal-deep border-royal/25',
    COMMERCIAL: 'bg-violet-tint text-violet-deep border-violet/25',
    BUY: 'bg-marigold-tint text-marigold-deep border-marigold/30',
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <h2 className="text-display-md text-bone flex items-center gap-3">
          <Compass className="w-5 h-5 text-pine" aria-hidden="true" /> SERP Competitor Simulator
        </h2>
        <p className="text-sm text-bone-mute mt-1">
          Simulated Google SERP layout, domain rating (DR), and snippet landscape for:{' '}
          <strong className="text-marigold">&quot;{keyword}&quot;</strong>
        </p>
      </Reveal>

      <div className="card p-5 sm:p-6 max-w-4xl space-y-5">

        {/* Search Bar Mockup */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-ink border border-white/15 text-xs">
          <Globe className="w-4 h-4 text-bone-faint shrink-0" aria-hidden="true" />
          <label htmlFor="serp-keyword-display" className="sr-only">Simulated search query</label>
          <output id="serp-keyword-display" className="text-bone font-medium truncate">{keyword}</output>
          <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">Google SERP mockup</span>
        </div>

        {/* Featured Snippet Opportunity */}
        <div className="p-4 rounded-sm bg-marigold-pale border border-marigold/30 space-y-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-marigold-deep">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Featured snippet target opportunity
          </div>
          <p className="text-xs text-ink/70 leading-relaxed">
            To rank for <span className="text-ink font-semibold">&quot;{keyword}&quot;</span>, format your service page with clear H2 subheadings, FAQs, and a 50-word concise service summary.
          </p>
        </div>

        {/* Result List */}
        <div className="divide-y divide-white/10 border-t border-white/10">
          {mockSerpResults.map((result, idx) => (
            <Reveal key={idx} delay={(idx % 8) * 60}>
              <div className="py-4 space-y-1.5 hover:bg-white/[0.04] transition-colors -mx-3 px-3 rounded-sm">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[11px] text-sage truncate">{result.breadcrumb}</span>
                    <span className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${intentTagCls[result.intentTag]}`}>
                      {result.intentTag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/15 font-mono text-[10px] font-semibold text-bone-mute">DR {result.dr}</span>
                    <span className="font-mono text-[10px] text-bone-faint">{result.backlinks} links</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-bone hover:underline cursor-pointer flex items-center gap-1.5">
                  <span>{idx + 1}. {result.title}</span>
                  <ExternalLink className="w-3 h-3 text-bone-faint shrink-0" aria-hidden="true" />
                </h3>

                <p className="text-xs text-bone-mute leading-relaxed">
                  {result.snippet}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
}
