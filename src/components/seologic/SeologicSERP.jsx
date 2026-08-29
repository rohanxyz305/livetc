import React from 'react';
import { Compass, ExternalLink, Sparkles, Globe } from 'lucide-react';

export default function SeologicSERP({ targetKeyword = '' }) {
  const keyword = targetKeyword || 'amazon seller account management services';

  const mockSerpResults = [
    {
      title: `10 Best ${keyword.split(' ')[0]} Services & Agencies (2026 Review)`,
      url: `https://liveteachcreate.com/services/${keyword.replace(/\s+/g, '-')}`,
      breadcrumb: 'liveteachcreate.com › services › agency',
      snippet: `Discover top rated ${keyword} by Liveteachcreate. Boost sales GMV across Amazon, Flipkart, Meesho & Blinkit.`,
      dr: 86,
      backlinks: '12.4K'
    },
    {
      title: `${keyword.toUpperCase()} - Seller Central Growth Guide`,
      url: `https://www.capterra.com/search?q=${encodeURIComponent(keyword)}`,
      breadcrumb: 'capterra.com › software › agency',
      snippet: `Compare verified client reviews and services for ${keyword}. Learn how top brands scale marketplace revenue.`,
      dr: 91,
      backlinks: '42.8K'
    },
    {
      title: `Complete Beginner Guide to ${keyword}`,
      url: `https://www.hubspot.com/resources/${keyword.replace(/\s+/g, '-')}`,
      breadcrumb: 'hubspot.com › resources › guide',
      snippet: `Everything you need to know about ${keyword}. Includes step-by-step instructions and strategy blueprints.`,
      dr: 93,
      backlinks: '105.1K'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
          <Compass className="w-5 h-5 text-[#FEE715]" /> SERP Competitor Simulator
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Simulated Google SERP layout, domain rating (DR), and snippet landscape for: <strong className="text-[#FEE715]">"{keyword}"</strong>
        </p>
      </div>

      <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 p-3 bg-black rounded-xl border border-gray-800 text-xs">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-gray-200 font-medium">{keyword}</span>
          <span className="ml-auto text-xs text-[#FEE715] font-bold">Google SERP Mockup</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FEE715]/10 border border-[#FEE715]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FEE715]">
            <Sparkles className="w-3.5 h-3.5" /> Featured Snippet Target Opportunity
          </div>
          <p className="text-xs text-gray-200 leading-relaxed font-medium">
            To rank for <span className="text-[#FEE715] font-bold">"{keyword}"</span>, format your service page with clear H2 subheadings, FAQs, and a 50-word concise service summary.
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {mockSerpResults.map((result, idx) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-lg hover:bg-black/40 transition">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="truncate max-w-md">{result.breadcrumb}</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-bold text-[10px]">DR {result.dr}</span>
                  <span className="text-gray-500 text-[11px]">{result.backlinks} links</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-indigo-400 hover:underline cursor-pointer flex items-center gap-1">
                <span>{idx + 1}. {result.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                {result.snippet}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
