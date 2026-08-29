import React from 'react';
import { Bookmark, Trash2, Download, ExternalLink } from 'lucide-react';

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
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <Bookmark className="w-5 h-5 text-[#FEE715] fill-[#FEE715]" /> Saved Keyword Campaign List
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Bookmarked keywords for your active SEO campaign & content strategy.
          </p>
        </div>

        {savedKeywords.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-yellowGlow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Saved CSV</span>
            </button>

            <button
              onClick={onClearAll}
              className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold rounded-xl border border-rose-500/20 text-xs flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear List</span>
            </button>
          </div>
        )}
      </div>

      {savedKeywords.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl">
          No saved keywords yet. Click the bookmark icon next to any keyword in the research table to save it here.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-around text-center text-xs shadow-xl">
            <div>
              <span className="text-gray-400 block font-medium">Saved Items</span>
              <strong className="text-lg font-bold text-white">{savedKeywords.length}</strong>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div>
              <span className="text-gray-400 block font-medium">Combined Volume</span>
              <strong className="text-lg font-bold text-emerald-400">{totalVol.toLocaleString()}</strong>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div>
              <span className="text-gray-400 block font-medium">Avg Difficulty</span>
              <strong className="text-lg font-bold text-amber-400">{avgKD}%</strong>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black/80 text-gray-400 border-b border-gray-800 font-semibold uppercase tracking-wider">
                  <th className="p-3">Keyword</th>
                  <th className="p-3">Intent</th>
                  <th className="p-3 text-right">Volume</th>
                  <th className="p-3 text-center">KD%</th>
                  <th className="p-3 text-right">CPC</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {savedKeywords.map((item) => (
                  <tr key={item.keyword} className="hover:bg-gray-800/40 transition">
                    <td className="p-3 font-bold text-white">{item.keyword}</td>
                    <td className="p-3 text-gray-300">{item.intent.label}</td>
                    <td className="p-3 text-right font-bold text-gray-200">{item.volume.toLocaleString()}</td>
                    <td className="p-3 text-center font-bold text-amber-400">{item.kd}%</td>
                    <td className="p-3 text-right text-emerald-400">${item.cpc.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectKeywordForSerp(item.keyword)}
                          className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-400"
                          title="SERP Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onRemoveKeyword(item.keyword)}
                          className="p-1 rounded bg-gray-800 hover:bg-rose-500/20 text-rose-400"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
