import React from 'react';
import { Key, Target, TrendingUp, DollarSign } from 'lucide-react';

export default function SeologicOverview({ summary, topOpportunity }) {
  if (!summary) return null;

  const getKDColorClass = (kd) => {
    if (kd <= 30) return { label: 'Easy', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (kd <= 60) return { label: 'Medium', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { label: 'Hard', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  const kdStatus = getKDColorClass(summary.avgKD);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Card 1: Total Keywords */}
      <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-[#FEE715]/10 border border-[#FEE715]/30 flex items-center justify-center text-[#FEE715]">
          <Key className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Keywords</p>
          <p className="text-2xl font-bold text-white mt-0.5">{summary.totalKeywords}</p>
          <p className="text-xs text-gray-500 mt-1">Discovered for "{summary.seed}"</p>
        </div>
      </div>

      {/* Card 2: Average KD */}
      <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg. Difficulty</p>
            <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-full ${kdStatus.bg}`}>
              {kdStatus.label}
            </span>
          </div>
          <p className="text-2xl font-bold text-white mt-0.5">{summary.avgKD}%</p>
          <p className="text-xs text-gray-500 mt-1">Competition level</p>
        </div>
      </div>

      {/* Card 3: Total Search Volume */}
      <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Est. Total Volume</p>
          <p className="text-2xl font-bold text-white mt-0.5">{summary.totalVolume.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Monthly searches</p>
        </div>
      </div>

      {/* Card 4: Top Opportunity */}
      <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
          <DollarSign className="w-6 h-6" />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Opportunity</p>
          <p className="text-sm font-bold text-[#FEE715] truncate mt-0.5">
            {topOpportunity ? topOpportunity.keyword : 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Score: <span className="text-emerald-400 font-bold">{topOpportunity?.opportunity || 0}/100</span>
          </p>
        </div>
      </div>

    </div>
  );
}
