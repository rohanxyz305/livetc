import React, { useState } from 'react';
import { Search, Globe, Filter, Sparkles, HelpCircle, SortAsc, Zap } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';

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

  const modes = [
    { id: 'broad', label: 'Broad match + LSI', icon: Sparkles },
    { id: 'questions', label: 'Questions only', icon: HelpCircle },
    { id: 'alphabet', label: 'Alphabet soup (A-Z)', icon: SortAsc },
  ];

  return (
    <div className="bg-paper relative overflow-hidden border-b border-white/10 py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
      {/* aurora field — marigold + violet duotone wash behind the search hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="aurora"
          style={{
            width: '420px',
            height: '420px',
            background: '#F97316',
            top: '-150px',
            left: 'calc(50% - 210px)',
            opacity: 0.28,
            animationDelay: '0s'
          }}
        ></span>
        <span
          className="aurora"
          style={{
            width: '400px',
            height: '400px',
            background: '#8B5CF6',
            top: '-170px',
            right: '-80px',
            opacity: 0.24,
            animationDelay: '-7s'
          }}
        ></span>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative">

        {/* Title Block */}
        <div className="space-y-4">
          <Reveal as="p" delay={0} className="eyebrow">
            <Sparkles className="w-3.5 h-3.5 text-marigold" aria-hidden="true" />
            Free SEO keyword intelligence
          </Reveal>
          <Reveal as="h1" delay={90} className="text-display-md text-bone">
            Seologic <span className="text-pine">Keyword</span> <span className="grad-text">Research</span> Studio
          </Reveal>
          <Reveal as="p" delay={170} className="lede max-w-2xl mx-auto text-base sm:text-lg">
            Live Google Autocomplete data, Datamuse LSI synonyms, and keyword difficulty metrics for your e-commerce and content strategy.
          </Reveal>
        </div>

        {/* Search Input Box */}
        <Reveal delay={240}>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="card p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 shadow-lift focus-within:shadow-glowmarigold">

              <label htmlFor="seologic-seed" className="sr-only">Seed keyword</label>
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bone-faint" aria-hidden="true" />
                <input
                  id="seologic-seed"
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Enter a seed keyword, e.g. 'amazon seller' or 'ecommerce agency'"
                  className="field pl-11 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="seologic-country" className="sr-only">Country</label>
                <div className="relative flex-1 md:w-40">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bone-faint pointer-events-none" aria-hidden="true" />
                  <select
                    id="seologic-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="field pl-9 pr-3 py-3 text-xs font-mono uppercase tracking-wider appearance-none cursor-pointer"
                  >
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  className="btn btn-accent btn-sweep px-5 py-3 text-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" aria-hidden="true" />
                      <span>Analyzing</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-ink/20" aria-hidden="true" />
                      <span>Analyze keywords</span>
                      <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Reveal>

        {/* Mode Selector Toggles */}
        <Reveal delay={320}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" /> Mining mode
            </span>

            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = searchMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSearchMode(mode.id)}
                  aria-pressed={isActive}
                  className={`chip ${isActive ? 'chip-active' : 'hover:border-white/40 hover:text-bone'}`}
                >
                  <Icon className="w-3 h-3" aria-hidden="true" /> {mode.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Quick Presets */}
        <Reveal delay={390}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">Preset ideas</span>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="px-2.5 py-1 rounded-sm bg-cream border border-white/15 font-mono text-[11px] text-bone-mute hover:border-white/40 hover:text-bone transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </Reveal>

      </div>
    </div>
  );
}
