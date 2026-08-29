import React, { useState, useMemo } from 'react';
import { HelpCircle, Copy, Check, MessageSquare } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <HelpCircle className="w-5 h-5 text-[#FEE715]" /> People Also Ask & Questions
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Discover questions users search on Google for content FAQs and featured snippet targeting.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-900 p-1 rounded-xl border border-gray-800">
          {['ALL', 'HOW', 'WHAT', 'WHY', 'CAN_IS'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === type ? 'bg-[#FEE715] text-[#101820]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {type === 'CAN_IS' ? 'Can / Is' : type}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl">
          No question keywords found for this search. Try switching to "Questions Only" mode in the search hero.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.keyword} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-[#FEE715]/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FEE715] shrink-0" />
                    {item.keyword}
                  </span>
                  <button
                    onClick={() => handleCopy(item.keyword)}
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition shrink-0"
                    title="Copy question"
                  >
                    {copiedKw === item.keyword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-800/80 text-xs">
                <span className="text-gray-400">Vol: <strong className="text-gray-200">{item.volume.toLocaleString()}</strong></span>
                <span className="text-gray-400">KD: <strong className={item.kd <= 30 ? 'text-emerald-400' : 'text-amber-400'}>{item.kd}%</strong></span>
                <span className="px-2 py-0.5 rounded bg-[#FEE715]/10 text-[#FEE715] font-bold text-[10px]">Opp: {item.opportunity}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
