import React from 'react';
import { Search, Sparkles, Bookmark, Layers, HelpCircle, Compass, Package } from 'lucide-react';

export default function SeologicNavbar({ activeTab, setActiveTab, savedCount = 0 }) {
  const tabs = [
    { id: 'overview', label: 'Keyword Research', icon: Search },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'clusters', label: 'Topic Clusters', icon: Layers },
    { id: 'generator', label: 'AI Listing Generator', icon: Package },
    { id: 'serp', label: 'SERP Simulator', icon: Compass },
    { id: 'saved', label: `Saved Lists (${savedCount})`, icon: Bookmark },
  ];

  return (
    <header className="border-b border-white/10 bg-ink text-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">

        {/* Brand Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-marigold text-ink flex items-center justify-center">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <span className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-bone">
              <span className="relative pb-1">
                Seologic
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[linear-gradient(90deg,#F97316,#E42A8A,#8B5CF6,#2563EB,#FBBF24)]" aria-hidden="true"></span>
              </span>
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-leaf"></span>
              </span>
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
              by Liveteachcreate
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Seologic tools" className="flex items-center gap-1 overflow-x-auto -mb-3 max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap border-b-2 transition-all duration-200 ${
                  isActive
                    ? 'border-marigold text-bone'
                    : 'border-transparent text-bone-mute hover:text-bone'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-marigold' : ''}`} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
