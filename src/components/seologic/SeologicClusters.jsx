import React, { useState, useMemo } from 'react';
import { Layers, Folder, PenTool, CheckCircle } from 'lucide-react';
import SeologicArticleWriterModal from './SeologicArticleWriterModal';
import Reveal from '../common/Reveal.jsx';

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
    setNotification(`Article "${article.title}" published to site. SEO Score: ${article.seoScore}/100`);
    setTimeout(() => setNotification(null), 5000);
  };

  // Keyword chip accents rotate through the 5-hue register by index (tint bg, -deep accent text)
  const chipAccents = [
    'bg-marigold-tint border-marigold/30 text-marigold-deep',
    'bg-pine-tint border-pine/25 text-pine-deep',
    'bg-rani-tint border-rani/25 text-rani-deep',
    'bg-violet-tint border-violet/25 text-violet-deep',
    'bg-royal-tint border-royal/25 text-royal-deep',
  ];

  if (keywords.length === 0) {
    return (
      <div className="card p-12 text-center font-mono text-xs uppercase tracking-[0.14em] text-bone-mute">
        Run a keyword search to automatically generate topic clusters
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {notification && (
        <div className="card p-4 bg-pine-tint border-pine/30 text-pine-deep text-xs font-semibold flex items-center justify-between animate-fade-up" role="status">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} aria-label="Dismiss notification" className="text-pine-deep/60 hover:text-pine-deep">&times;</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-md text-bone flex items-center gap-3">
            <Layers className="w-5 h-5 text-pine" aria-hidden="true" /> Topic Clusters &amp; On-Page SEO Writer
          </h2>
          <p className="text-sm text-bone-mute mt-1">
            Semantic keywords grouped into content pillar buckets, with one-click on-page SEO article generation and publication.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clusters.map((cluster, idx) => (
          <Reveal key={cluster.name} delay={(idx % 6) * 80} className="flex">
            <div className="card pop-hover flex flex-col justify-between space-y-4 flex-1">

              <div>
                <div className="flex items-start justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-bone text-base flex items-center gap-2">
                      <Folder className="w-4 h-4 text-pine" aria-hidden="true" /> {cluster.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint mt-1">
                      {cluster.list.length} cluster keywords
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-sage block">{cluster.totalVol.toLocaleString()} vol</span>
                    <span className="font-mono text-[10px] text-bone-faint">Avg KD: {cluster.avgKD}%</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                  {cluster.list.slice(0, 5).map((item, kwIdx) => (
                    <li key={item.keyword} className={`flex items-center justify-between px-2.5 py-2 rounded-sm border text-xs ${chipAccents[kwIdx % 5]}`}>
                      <span className="font-medium truncate max-w-[170px]">{item.keyword}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px]">{item.volume.toLocaleString()}</span>
                        <span className="px-1.5 py-0.5 font-mono text-[10px] font-medium rounded-sm border border-ink/15 text-ink/70">{item.kd}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Writer Trigger Action Button */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedClusterForWriter(cluster)}
                  className="btn btn-accent btn-sweep w-full px-4 py-2.5 text-sm"
                >
                  <PenTool className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Write SEO article</span>
                  <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </Reveal>
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
