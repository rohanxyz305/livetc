import React, { useState, useMemo } from 'react';
import { Layers, Folder, PenTool, CheckCircle, Sparkles } from 'lucide-react';
import SeologicArticleWriterModal from './SeologicArticleWriterModal';

export default function SeologicClusters({ keywords = [], seed = '' }) {
  const [selectedClusterForWriter, setSelectedClusterForWriter] = useState(null);
  const [notification, setNotification] = useState(null);

  const clusters = useMemo(() => {
    if (!keywords || keywords.length === 0) return [];

    const groupMap = {
      'Question & Learning': [],
      'Best & Commercial': [],
      'Price & Purchasing': [],
      'Comparison & Alternatives': [],
      'Beginner & Fundamentals': [],
      'General & Long-Tail': []
    };

    keywords.forEach(item => {
      const lower = item.keyword.toLowerCase();
      if (lower.startsWith('how') || lower.startsWith('what') || lower.startsWith('why') || lower.includes('tutorial')) {
        groupMap['Question & Learning'].push(item);
      } else if (lower.includes('best') || lower.includes('top') || lower.includes('review')) {
        groupMap['Best & Commercial'].push(item);
      } else if (lower.includes('buy') || lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('cheap')) {
        groupMap['Price & Purchasing'].push(item);
      } else if (lower.includes('vs') || lower.includes('versus') || lower.includes('alternative') || lower.includes('compare')) {
        groupMap['Comparison & Alternatives'].push(item);
      } else if (lower.includes('beginner') || lower.includes('guide') || lower.includes('basics') || lower.includes('101')) {
        groupMap['Beginner & Fundamentals'].push(item);
      } else {
        groupMap['General & Long-Tail'].push(item);
      }
    });

    return Object.entries(groupMap)
      .filter(([_, list]) => list.length > 0)
      .map(([name, list]) => {
        const totalVol = list.reduce((sum, k) => sum + k.volume, 0);
        const avgKD = Math.round(list.reduce((sum, k) => sum + k.kd, 0) / list.length);
        return { name, list, totalVol, avgKD };
      });
  }, [keywords]);

  const handlePublishSuccess = (article) => {
    setSelectedClusterForWriter(null);
    setNotification(`✅ Article "${article.title}" published successfully to site! (SEO Score: ${article.seoScore}/100)`);
    setTimeout(() => setNotification(null), 5000);
  };

  if (keywords.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl">
        Run a keyword search to automatically generate Topic Clusters.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <Layers className="w-5 h-5 text-[#FEE715]" /> Topic Clusters & On-Page SEO Writer
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Grouped semantic keywords into content pillar buckets with 1-click On-Page SEO Article Generation & Publication.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster) => (
          <div key={cluster.name} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl flex flex-col justify-between hover:border-gray-700 transition space-y-4">
            <div>
              <div className="flex items-start justify-between border-b border-gray-800 pb-3 mb-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#FEE715]" /> {cluster.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{cluster.list.length} Cluster Keywords</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 block">{cluster.totalVol.toLocaleString()} vol</span>
                  <span className="text-[11px] text-gray-400">Avg KD: {cluster.avgKD}%</span>
                </div>
              </div>

              <ul className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                {cluster.list.slice(0, 5).map((item) => (
                  <li key={item.keyword} className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-gray-800 text-xs">
                    <span className="font-medium text-gray-200 truncate max-w-[170px]">{item.keyword}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-400">{item.volume.toLocaleString()}</span>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gray-800 text-gray-300">{item.kd}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Writer Trigger Action Button */}
            <div className="pt-3 border-t border-gray-800/80 space-y-2">
              <button
                onClick={() => setSelectedClusterForWriter(cluster)}
                className="w-full py-2.5 px-4 bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-extrabold text-xs rounded-xl shadow-yellowGlow flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Write & Optimize SEO Article</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render Writer Modal */}
      {selectedClusterForWriter && (
        <SeologicArticleWriterModal
          cluster={selectedClusterForWriter}
          seed={seed}
          onClose={() => setSelectedClusterForWriter(null)}
          onPublishSuccess={handlePublishSuccess}
        />
      )}
    </div>
  );
}
