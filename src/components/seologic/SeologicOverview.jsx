import React from 'react';
import { Key, Target, TrendingUp, DollarSign } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

export default function SeologicOverview({ summary, topOpportunity }) {
  if (!summary) return null;

  const getKDColorClass = (kd) => {
    if (kd <= 30) return { label: 'Easy', cls: 'bg-pine-tint text-pine-deep border-pine/25' };
    if (kd <= 60) return { label: 'Medium', cls: 'bg-marigold-tint text-marigold-deep border-marigold/30' };
    return { label: 'Hard', cls: 'bg-clay/10 text-clay border-clay/30' };
  };

  const kdStatus = getKDColorClass(summary.avgKD);

  // Rotating accent tints for the metric icon squares (marigold / pine / rani / royal)
  const iconTints = [
    'bg-marigold-tint text-marigold-deep border-marigold/30',
    'bg-pine-tint text-pine border-pine/25',
    'bg-rani-tint text-rani-deep border-rani/25',
    'bg-royal-tint text-royal-deep border-royal/30',
  ];

  const metrics = [
    {
      icon: Key,
      label: 'Total keywords',
      value: summary.totalKeywords,
      note: `Discovered for "${summary.seed}"`,
    },
    {
      icon: Target,
      label: 'Avg. difficulty',
      badge: kdStatus,
      value: `${summary.avgKD}%`,
      note: 'Competition level',
    },
    {
      icon: TrendingUp,
      label: 'Est. total volume',
      value: summary.totalVolume.toLocaleString(),
      note: 'Monthly searches',
    },
    {
      icon: DollarSign,
      label: 'Top opportunity',
      value: topOpportunity ? topOpportunity.keyword : 'N/A',
      isKeyword: true,
      note: topOpportunity ? (
        <>Score: <span className="text-sage font-semibold">{topOpportunity?.opportunity || 0}/100</span></>
      ) : (
        'No keywords yet'
      ),
    },
  ];

  return (
    <Reveal className="card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden">

      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className="p-5 flex items-start gap-4 border-white/10">
            <div className={`w-10 h-10 rounded-sm border flex items-center justify-center shrink-0 ${iconTints[idx % 4]}`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-mute">
                  {metric.label}
                </p>
                {metric.badge && (
                  <span className={`px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider border rounded-full ${metric.badge.cls}`}>
                    {metric.badge.label}
                  </span>
                )}
              </div>
              {metric.isKeyword ? (
                <p className="text-sm font-semibold text-marigold mt-1 truncate" title={metric.value}>
                  {metric.value}
                </p>
              ) : (
                <p className="stat-num text-2xl text-bone mt-0.5">{metric.value}</p>
              )}
              <p className="text-xs text-bone-faint mt-1">{metric.note}</p>
            </div>
          </div>
        );

      })}

    </Reveal>
  );
}
