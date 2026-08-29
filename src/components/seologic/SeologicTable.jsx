import React, { useState, useMemo, useRef } from 'react';
import {
  Search, Download, Copy, Bookmark, Check,
  Info, HelpCircle, ShoppingCart, Compass, ExternalLink
} from 'lucide-react';
import Reveal from '../common/Reveal.jsx';
import useInView from '../../hooks/useInView.js';

export default function SeologicTable({ keywords = [], onSaveKeyword, savedKeywords = [], onSelectKeywordForSerp }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState('ALL');
  const [selectedKD, setSelectedKD] = useState('ALL');
  const [sortField, setSortField] = useState('opportunity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  // Difficulty bars grow in once the table scrolls into view
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { threshold: 0.08 });

  const filteredKeywords = useMemo(() => {
    return keywords.filter(item => {
      const matchesSearch = item.keyword.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIntent = selectedIntent === 'ALL' || item.intent.type === selectedIntent.toLowerCase();

      let matchesKD = true;
      if (selectedKD === 'EASY') matchesKD = item.kd <= 30;
      if (selectedKD === 'MEDIUM') matchesKD = item.kd > 30 && item.kd <= 60;
      if (selectedKD === 'HARD') matchesKD = item.kd > 60;

      return matchesSearch && matchesIntent && matchesKD;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [keywords, searchTerm, selectedIntent, selectedKD, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleSelectRow = (kw) => {
    const next = new Set(selectedRows);
    if (next.has(kw)) next.delete(kw);
    else next.add(kw);
    setSelectedRows(next);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === filteredKeywords.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredKeywords.map(k => k.keyword)));
    }
  };

  const handleCopySingle = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  const handleExportCSV = () => {
    const listToExport = selectedRows.size > 0
      ? keywords.filter(k => selectedRows.has(k.keyword))
      : filteredKeywords;

    const headers = ['Keyword', 'Intent', 'Volume', 'KD%', 'CPC ($)', 'Opportunity Score'];
    const rows = listToExport.map(k => [
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
    link.setAttribute('download', `seologic_keywords_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderIntentBadge = (intent) => {
    const type = intent.type || intent.label.toLowerCase();
    const badgeCls = 'px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider border rounded-sm flex items-center gap-1 w-fit';
    switch (type) {
      case 'informational':
        return (
          <span className={`${badgeCls} bg-royal-tint text-royal-deep border-royal/25`}>
            <Info className="w-3 h-3" aria-hidden="true" /> Info
          </span>
        );
      case 'commercial':
        return (
          <span className={`${badgeCls} bg-violet-tint text-violet-deep border-violet/25`}>
            <HelpCircle className="w-3 h-3" aria-hidden="true" /> Commercial
          </span>
        );
      case 'transactional':
        return (
          <span className={`${badgeCls} bg-marigold-tint text-marigold-deep border-marigold/30`}>
            <ShoppingCart className="w-3 h-3" aria-hidden="true" /> Buy
          </span>
        );
      default:
        return (
          <span className={`${badgeCls} bg-ink text-bone-mute border-white/15`}>
            <Compass className="w-3 h-3" aria-hidden="true" /> Nav
          </span>
        );
    }
  };

  const renderKDMeter = (kd) => {
    let color = 'bg-pine';
    let text = 'text-pine';
    if (kd > 30 && kd <= 60) {
      color = 'bg-marigold';
      text = 'text-marigold';
    } else if (kd > 60) {
      color = 'bg-clay';
      text = 'text-clay';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full ${tableInView ? 'bar-grow' : ''}`} style={{ width: `${kd}%` }} />
        </div>
        <span className={`font-mono text-xs font-semibold ${text}`}>{kd}%</span>
      </div>
    );
  };

  const isSaved = (kw) => savedKeywords.some(s => s.keyword === kw);

  const SortIcon = ({ field }) => {
    const isActive = sortField === field;
    const icon = isActive && sortDirection === 'asc' ? 'fa-sort-up' : isActive && sortDirection === 'desc' ? 'fa-sort-down' : 'fa-sort';
    return <i className={`fas ${icon} text-[9px] ${isActive ? 'text-marigold' : 'text-bone-faint'}`} aria-hidden="true"></i>;
  };

  const actionBtnCls = 'p-1.5 rounded-sm border border-white/15 text-bone-mute hover:bg-white/10 hover:text-bone hover:border-white/30 transition-colors';

  return (
    <Reveal className="bg-cream border border-white/10 rounded-sm overflow-hidden">

      {/* Controls Bar */}
      <div className="p-4 border-b border-white/10 bg-ink flex flex-col lg:flex-row items-center justify-between gap-4">

        <label htmlFor="keyword-filter" className="sr-only">Filter keywords</label>
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-bone-faint" aria-hidden="true" />
          <input
            id="keyword-filter"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter keywords"
            className="field pl-9 pr-3 py-2 text-xs"
          />
        </div>

        {/* Intent Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint mr-1">Intent</span>
          {['ALL', 'INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL'].map((intent) => (
            <button
              key={intent}
              onClick={() => setSelectedIntent(intent)}
              aria-pressed={selectedIntent === intent}
              className={`chip px-2.5 py-1 !text-[10px] ${selectedIntent === intent ? 'chip-active' : 'hover:border-white/40 hover:text-bone'}`}
            >
              {intent}
            </button>
          ))}
        </div>

        {/* KD & Export */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint mr-1">KD</span>
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((kd) => (
              <button
                key={kd}
                onClick={() => setSelectedKD(kd)}
                aria-pressed={selectedKD === kd}
                className={`chip px-2.5 py-1 !text-[10px] ${selectedKD === kd ? 'chip-active' : 'hover:border-white/40 hover:text-bone'}`}
              >
                {kd}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="btn btn-outline px-3.5 py-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Export CSV ({selectedRows.size > 0 ? selectedRows.size : filteredKeywords.length})</span>
          </button>
        </div>

      </div>

      {/* Data Table */}
      <div ref={tableRef} className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-cream border-b border-white/15 select-none">
              <th scope="col" className="p-3.5 w-10 text-center border-l-2 border-l-transparent">
                <input
                  type="checkbox"
                  aria-label="Select all keywords"
                  checked={filteredKeywords.length > 0 && selectedRows.size === filteredKeywords.length}
                  onChange={toggleSelectAll}
                  className="accent-marigold cursor-pointer"
                />
              </th>
              <th scope="col" onClick={() => handleSort('keyword')} className="p-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint cursor-pointer hover:text-bone transition-colors">
                <button type="button" className="flex items-center gap-1.5 uppercase tracking-[0.18em]">
                  <span>Keyword</span>
                  <SortIcon field="keyword" />
                </button>
              </th>
              <th scope="col" className="p-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Intent</th>
              <th scope="col" onClick={() => handleSort('volume')} className="p-3.5 cursor-pointer hover:text-bone transition-colors text-right">
                <button type="button" className="flex items-center justify-end gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint w-full">
                  <span>Volume</span>
                  <SortIcon field="volume" />
                </button>
              </th>
              <th scope="col" onClick={() => handleSort('kd')} className="p-3.5 cursor-pointer hover:text-bone transition-colors">
                <button type="button" className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">
                  <span>Difficulty (KD)</span>
                  <SortIcon field="kd" />
                </button>
              </th>
              <th scope="col" onClick={() => handleSort('cpc')} className="p-3.5 cursor-pointer hover:text-bone transition-colors text-right">
                <button type="button" className="flex items-center justify-end gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint w-full">
                  <span>CPC</span>
                  <SortIcon field="cpc" />
                </button>
              </th>
              <th scope="col" onClick={() => handleSort('opportunity')} className="p-3.5 cursor-pointer hover:text-bone transition-colors text-center">
                <button type="button" className="flex items-center justify-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint w-full">
                  <span>Opportunity</span>
                  <SortIcon field="opportunity" />
                </button>
              </th>
              <th scope="col" className="p-3.5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-bone-faint">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredKeywords.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center font-mono text-xs uppercase tracking-[0.14em] text-bone-faint">
                  No keywords matching the filter criteria
                </td>
              </tr>
            ) : (
              filteredKeywords.map((item) => {
                const isSelected = selectedRows.has(item.keyword);
                const isBookmarked = isSaved(item.keyword);

                return (
                  <tr key={item.keyword} className={`transition-colors hover:bg-white/[0.04] ${isSelected ? 'bg-marigold-pale' : ''}`}>
                    <td className={`p-3.5 text-center border-l-2 ${isSelected ? 'border-l-marigold' : 'border-l-transparent'}`}>
                      <input
                        type="checkbox"
                        aria-label={`Select ${item.keyword}`}
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item.keyword)}
                        className="accent-marigold cursor-pointer"
                      />
                    </td>
                    <td className={`p-3.5 font-semibold text-xs sm:text-sm ${isSelected ? 'text-ink' : 'text-bone'}`}>{item.keyword}</td>
                    <td className="p-3.5">{renderIntentBadge(item.intent)}</td>
                    <td className={`p-3.5 text-right font-mono font-semibold ${isSelected ? 'text-ink/70' : 'text-bone-mute'}`}>{item.volume.toLocaleString()}</td>
                    <td className="p-3.5">{renderKDMeter(item.kd)}</td>
                    <td className={`p-3.5 text-right font-mono font-semibold ${isSelected ? 'text-pine-deep' : 'text-pine'}`}>${item.cpc.toFixed(2)}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-1 font-mono text-xs font-semibold rounded-sm bg-marigold-tint text-marigold-deep border border-marigold/30">
                        {item.opportunity}/100
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleCopySingle(item.keyword)}
                          title="Copy keyword"
                          aria-label={`Copy keyword ${item.keyword}`}
                          className={actionBtnCls}
                        >
                          {copiedKeyword === item.keyword ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => onSaveKeyword(item)}
                          title={isBookmarked ? 'Remove bookmark' : 'Save to list'}
                          aria-label={isBookmarked ? `Remove ${item.keyword} from saved list` : `Save ${item.keyword} to list`}
                          className={`p-1.5 rounded-sm border transition-colors ${
                            isBookmarked
                              ? 'bg-marigold text-ink border-marigold'
                              : 'border-white/15 text-bone-mute hover:bg-white/10 hover:text-bone hover:border-white/30'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-ink' : ''}`} />
                        </button>
                        <button
                          onClick={() => onSelectKeywordForSerp(item.keyword)}
                          title="Preview SERP"
                          aria-label={`Preview SERP for ${item.keyword}`}
                          className="p-1.5 rounded-sm border border-white/15 text-pine hover:bg-white/10 hover:border-white/30 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </Reveal>
  );
}
