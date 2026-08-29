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
    <div className="border-b border-gray-800 bg-[#101820] py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-black text-lg shadow-yellowGlow">
            <Sparkles className="w-4 h-4 text-[#101820]" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white font-display">
              SEOLOGIC <span className="text-[#FEE715] text-xs font-normal">by Liveteachcreate</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#101820]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
