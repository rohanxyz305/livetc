import React from 'react';
import { Bookmark, Trash2, Download, ExternalLink } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

export default function SeologicSaved({ savedKeywords = [], onRemoveKeyword, onClearAll, onSelectKeywordForSerp }) {
  const totalVol = savedKeywords.reduce((acc, curr) => acc + curr.volume, 0);
  const avgKD = savedKeywords.length > 0
    ? Math.round(savedKeywords.reduce((acc, curr) => acc + curr.kd, 0) / savedKeywords.length)
    : 0;

  const handleExportCSV = () => {
    if (savedKeywords.length === 0) return;
    const headers = ['Keyword', 'Intent', 'Volume', 'KD%', 'CPC ($)', 'Opportunity Score'];
    const rows = savedKeywords.map(k => [
      `"${k.keyword.replace(/"/g, '""')}"`,
      k.intent.label,
      k.volume,
      k.kd,
      k.cpc,
      k.opportunity
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `seologic_saved_campaign_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-md text-bone flex items-center gap-3">
            <Bookmark className="w-5 h-5 text-pine fill-pine/20" aria-hidden="true" /> Saved Keyword Campaign List
          </h2>
          <p className="text-sm text-bone-mute mt-1">
            Bookmarked keywords for your active SEO campaign and content strategy.
          </p>
        </div>

        {savedKeywords.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="btn btn-accent btn-sweep px-3.5 py-2 text-xs"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export saved CSV</span>
            </button>

            <button
              onClick={onClearAll}
              className="btn btn-outline px-3.5 py-2 text-xs !text-clay !border-clay/40 hover:!bg-clay hover:!text-bone hover:!border-clay"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear list</span>
            </button>
          </div>
        )}
      </div>

      {savedKeywords.length === 0 ? (
        <div className="card p-12 text-center font-mono text-xs uppercase tracking-[0.14em] text-bone-mute">
          No saved keywords yet. Use the bookmark action next to any keyword in the research table to save it here
        </div>
      ) : (
        <div className="space-y-5">
          {/* Summary Strip */}
          <Reveal className="card grid grid-cols-3 divide-x divide-white/10 overflow-hidden">
            <div className="p-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint block">Saved items</span>
              <strong className="stat-num text-2xl text-marigold block mt-1">{savedKeywords.length}</strong>
            </div>
            <div className="p-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint block">Combined volume</span>
              <strong className="stat-num text-2xl text-violet block mt-1">{totalVol.toLocaleString()}</strong>
            </div>
            <div className="p-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint block">Avg difficulty</span>
              <strong className="stat-num text-2xl text-royal block mt-1">{avgKD}%</strong>
            </div>
          </Reveal>

          {/* Saved Table */}
          <Reveal className="bg-cream border border-white/10 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="p-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Keyword</th>
                  <th scope="col" className="p-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Intent</th>
                  <th scope="col" className="p-3.5 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Volume</th>
                  <th scope="col" className="p-3.5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">KD%</th>
                  <th scope="col" className="p-3.5 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">CPC</th>
                  <th scope="col" className="p-3.5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {savedKeywords.map((item) => (
                  <tr key={item.keyword} className="hover:bg-white/[0.04] transition-colors border-l-2 border-l-transparent hover:border-l-marigold">
                    <td className="p-3.5 font-semibold text-bone">{item.keyword}</td>
                    <td className="p-3.5 text-bone-mute">{item.intent.label}</td>
                    <td className="p-3.5 text-right font-mono font-semibold text-bone-mute">{item.volume.toLocaleString()}</td>
                    <td className="p-3.5 text-center font-mono font-semibold text-marigold">{item.kd}%</td>
                    <td className="p-3.5 text-right font-mono font-semibold text-pine">${item.cpc.toFixed(2)}</td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectKeywordForSerp(item.keyword)}
                          className="p-1.5 rounded-sm border border-white/15 text-pine hover:bg-white/10 hover:border-white/30 transition-colors"
                          title="SERP preview"
                          aria-label={`Preview SERP for ${item.keyword}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRemoveKeyword(item.keyword)}
                          className="p-1.5 rounded-sm border border-white/15 text-bone-mute hover:bg-clay/10 hover:text-clay hover:border-clay/40 transition-colors"
                          title="Remove"
                          aria-label={`Remove ${item.keyword} from saved list`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      )}
    </div>
  );
}
