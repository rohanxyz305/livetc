import React, { useState } from 'react';
import { Search, Globe, Filter, Sparkles, HelpCircle, SortAsc, Zap } from 'lucide-react';

export default function SeologicHero({ onSearch, isLoading, currentSeed }) {
  const [inputQuery, setInputQuery] = useState(currentSeed || '');
  const [searchMode, setSearchMode] = useState('broad');
  const [country, setCountry] = useState('us');

  const presets = [
    'amazon seller central',
    'ecommerce management',
    'quick commerce onboarding',
    'best crm software',
    'digital marketing agency'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      onSearch(inputQuery.trim(), searchMode, country);
    }
  };

  const handlePresetClick = (preset) => {
    setInputQuery(preset);
    onSearch(preset, searchMode, country);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-[#101820] to-[#101820] py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Title Badge */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-yellowGlow">
            <Sparkles className="w-3.5 h-3.5" /> FREE SEO KEYWORD INTELLIGENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
            Seologic <span className="text-[#FEE715]">Keyword Research</span> Studio
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Extract live Google Autocomplete data, Datamuse LSI synonyms, and keyword difficulty metrics for your e-commerce & content strategy.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="p-2 bg-gray-900/90 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center gap-2">
            
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FEE715]" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter seed keyword (e.g. 'amazon seller', 'ecommerce agency', 'seo tips')..."
                className="w-full pl-12 pr-4 py-3.5 bg-black/60 text-white placeholder-gray-500 rounded-xl border border-gray-800 focus:outline-none focus:border-[#FEE715] text-xs sm:text-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-36">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-9 pr-3 py-3.5 bg-black/60 text-gray-300 rounded-xl border border-gray-800 focus:outline-none focus:border-[#FEE715] text-xs font-semibold appearance-none cursor-pointer"
                >
                  <option value="us">🇺🇸 United States</option>
                  <option value="in">🇮🇳 India</option>
                  <option value="uk">🇬🇧 United Kingdom</option>
                  <option value="ca">🇨🇦 Canada</option>
                  <option value="au">🇦🇺 Australia</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-6 py-3.5 pulseBtn text-[#101820] font-extrabold rounded-xl shadow-yellowGlow flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-xs sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#101820]/30 border-t-[#101820] rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-[#101820]" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Mode Selector Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs font-medium text-gray-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Mining Mode:
          </span>

          <button
            type="button"
            onClick={() => setSearchMode('broad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              searchMode === 'broad'
                ? 'bg-[#FEE715]/20 text-[#FEE715] border-[#FEE715]/50'
                : 'bg-gray-900/60 text-gray-400 border-gray-800 hover:bg-gray-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Broad Match + LSI
          </button>

          <button
            type="button"
            onClick={() => setSearchMode('questions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              searchMode === 'questions'
                ? 'bg-[#FEE715]/20 text-[#FEE715] border-[#FEE715]/50'
                : 'bg-gray-900/60 text-gray-400 border-gray-800 hover:bg-gray-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Questions Only
          </button>

          <button
            type="button"
            onClick={() => setSearchMode('alphabet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              searchMode === 'alphabet'
                ? 'bg-[#FEE715]/20 text-[#FEE715] border-[#FEE715]/50'
                : 'bg-gray-900/60 text-gray-400 border-gray-800 hover:bg-gray-800'
            }`}
          >
            <SortAsc className="w-3.5 h-3.5" /> Alphabet Soup (A-Z)
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-500">Preset Ideas:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="px-2.5 py-1 rounded-md bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 transition"
            >
              {preset}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
