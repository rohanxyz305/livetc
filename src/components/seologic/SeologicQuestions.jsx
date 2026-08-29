import React, { useState, useMemo } from 'react';
import { HelpCircle, Copy, Check } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

export default function SeologicQuestions({ keywords = [], seed = '' }) {
  const [filterType, setFilterType] = useState('ALL');
  const [copiedKw, setCopiedKw] = useState(null);

  const questionKeywords = useMemo(() => {
    const questionWords = ['how', 'what', 'why', 'where', 'who', 'can', 'is', 'are', 'which', 'vs'];
    return keywords.filter(k => {
      const lower = k.keyword.toLowerCase();
      return questionWords.some(q => lower.includes(q));
    });
  }, [keywords]);

  const filtered = useMemo(() => {
    if (filterType === 'ALL') return questionKeywords;
    return questionKeywords.filter(k => {
      const lower = k.keyword.toLowerCase();
      if (filterType === 'HOW') return lower.includes('how');
      if (filterType === 'WHAT') return lower.includes('what');
      if (filterType === 'WHY') return lower.includes('why');
      if (filterType === 'CAN_IS') return lower.includes('can') || lower.includes('is');
      return true;
    });
  }, [questionKeywords, filterType]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKw(text);
    setTimeout(() => setCopiedKw(null), 1500);
  };

  // Consistent tint per derived question type (mapped by type, not index)
  const TYPE_TAG_TINTS = {
    HOW: 'bg-royal-tint border-royal/25 text-royal-deep',
    WHAT: 'bg-violet-tint border-violet/25 text-violet-deep',
    WHY: 'bg-rani-tint border-rani/25 text-rani-deep',
    'CAN / IS': 'bg-pine-tint border-pine/25 text-pine-deep',
    PAA: 'bg-marigold-tint border-marigold/30 text-marigold-deep',
  };

  // Mono type tag derived from the same matching rules as the filter
  const getTypeTag = (keyword) => {
    const lower = keyword.toLowerCase();
    if (lower.includes('how')) return 'HOW';
    if (lower.includes('what')) return 'WHAT';
    if (lower.includes('why')) return 'WHY';
    if (lower.includes('can') || lower.includes('is')) return 'CAN / IS';
    return 'PAA';
  };

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-md text-bone flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-pine" aria-hidden="true" /> People Also Ask &amp; Questions
          </h2>
          <p className="text-sm text-bone-mute mt-1">
            Questions users search on Google, for content FAQs and featured snippet targeting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'HOW', 'WHAT', 'WHY', 'CAN_IS'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              aria-pressed={filterType === type}
              className={`chip ${filterType === type ? 'chip-active' : 'hover:border-white/40 hover:text-bone'}`}
            >
              {type === 'CAN_IS' ? 'Can / Is' : type}
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center font-mono text-xs uppercase tracking-[0.14em] text-bone-mute">
          No question keywords found for this search. Try switching to &quot;Questions only&quot; mode in the search hero
        </div>
      ) : (
        <div className="card divide-y divide-white/10 overflow-hidden">
          {filtered.map((item, idx) => {
            const typeTag = getTypeTag(item.keyword);
            return (
              <Reveal key={item.keyword} delay={(idx % 8) * 60}>
                <div className="px-4 sm:px-5 py-4 hover:bg-white/[0.04] transition-colors border-l-2 border-l-transparent hover:border-l-marigold/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className={`px-2 py-0.5 rounded-sm border font-mono text-[10px] font-medium uppercase tracking-wider shrink-0 mt-0.5 ${TYPE_TAG_TINTS[typeTag]}`}>
                        {typeTag}
                      </span>
                      <span className="text-sm font-semibold text-bone leading-snug break-words">
                        {item.keyword}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.keyword)}
                      className="p-1.5 rounded-sm border border-white/15 text-bone-mute hover:bg-white/10 hover:text-bone transition-colors shrink-0"
                      title="Copy question"
                      aria-label={`Copy question: ${item.keyword}`}
                    >
                      {copiedKw === item.keyword ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-2 mt-2 pl-0 sm:pl-[calc(0.5rem+1px)] text-xs">
                    <span className="font-mono text-bone-faint">Vol: <strong className="text-bone-mute font-semibold">{item.volume.toLocaleString()}</strong></span>
                    <span className="font-mono text-bone-faint">KD: <strong className={`font-semibold ${item.kd <= 30 ? 'text-pine' : 'text-marigold'}`}>{item.kd}%</strong></span>
                    <span className="px-2 py-0.5 rounded-sm bg-marigold-tint border border-marigold/30 font-mono text-[10px] font-medium uppercase tracking-wider text-marigold-deep">Opp: {item.opportunity}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
