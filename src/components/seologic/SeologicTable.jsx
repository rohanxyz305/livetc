import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowUpDown, Download, Copy, Bookmark, Check, 
  Info, HelpCircle, ShoppingCart, Compass, ExternalLink 
} from 'lucide-react';

export default function SeologicTable({ keywords = [], onSaveKeyword, savedKeywords = [], onSelectKeywordForSerp }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState('ALL');
  const [selectedKD, setSelectedKD] = useState('ALL');
  const [sortField, setSortField] = useState('opportunity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [copiedKeyword, setCopiedKeyword] = useState(null);

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
    switch (type) {
      case 'informational':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1 w-fit">
            <Info className="w-3 h-3" /> Info
          </span>
        );
      case 'commercial':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit">
            <HelpCircle className="w-3 h-3" /> Commercial
          </span>
        );
      case 'transactional':
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
            <ShoppingCart className="w-3 h-3" /> Buy
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1 w-fit">
            <Compass className="w-3 h-3" /> Nav
          </span>
        );
    }
  };

  const renderKDMeter = (kd) => {
    let color = 'bg-emerald-500';
    let text = 'text-emerald-400';
    if (kd > 30 && kd <= 60) {
      color = 'bg-amber-500';
      text = 'text-amber-400';
    } else if (kd > 60) {
      color = 'bg-rose-500';
      text = 'text-rose-400';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full`} style={{ width: `${kd}%` }} />
        </div>
        <span className={`text-xs font-bold ${text}`}>{kd}%</span>
      </div>
    );
  };

  const isSaved = (kw) => savedKeywords.some(s => s.keyword === kw);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Controls Bar */}
      <div className="p-4 border-b border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter keywords..."
            className="w-full pl-9 pr-3 py-2 bg-black text-gray-200 placeholder-gray-500 rounded-xl border border-gray-800 focus:outline-none focus:border-[#FEE715] text-xs"
          />
        </div>

        {/* Intent Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          <span className="text-xs font-bold text-gray-400 mr-1">Intent:</span>
          {['ALL', 'INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL'].map((intent) => (
            <button
              key={intent}
              onClick={() => setSelectedIntent(intent)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedIntent === intent
                  ? 'bg-[#FEE715] text-[#101820]'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {intent}
            </button>
          ))}
        </div>

        {/* KD & Export */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-gray-400 mr-1">KD:</span>
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((kd) => (
              <button
                key={kd}
                onClick={() => setSelectedKD(kd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  selectedKD === kd
                    ? 'bg-[#FEE715] text-[#101820]'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {kd}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-xl border border-gray-700 text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ({selectedRows.size > 0 ? selectedRows.size : filteredKeywords.length})</span>
          </button>
        </div>

      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black/80 text-gray-400 border-b border-gray-800 font-semibold uppercase tracking-wider select-none">
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={filteredKeywords.length > 0 && selectedRows.size === filteredKeywords.length}
                  onChange={toggleSelectAll}
                  className="rounded bg-gray-800 border-gray-700 text-[#FEE715] focus:ring-0 cursor-pointer"
                />
              </th>
              <th onClick={() => handleSort('keyword')} className="p-3.5 cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-1">
                  <span>Keyword</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                </div>
              </th>
              <th className="p-3.5">Intent</th>
              <th onClick={() => handleSort('volume')} className="p-3.5 cursor-pointer hover:text-white transition text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                </div>
              </th>
              <th onClick={() => handleSort('kd')} className="p-3.5 cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-1">
                  <span>Difficulty (KD)</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                </div>
              </th>
              <th onClick={() => handleSort('cpc')} className="p-3.5 cursor-pointer hover:text-white transition text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>CPC</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                </div>
              </th>
              <th onClick={() => handleSort('opportunity')} className="p-3.5 cursor-pointer hover:text-white transition text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Opportunity</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-500" />
                </div>
              </th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 font-medium">
            {filteredKeywords.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  No keywords matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredKeywords.map((item) => {
                const isSelected = selectedRows.has(item.keyword);
                const isBookmarked = isSaved(item.keyword);

                return (
                  <tr key={item.keyword} className={`hover:bg-gray-800/40 transition ${isSelected ? 'bg-[#FEE715]/10' : ''}`}>
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(item.keyword)}
                        className="rounded bg-gray-800 border-gray-700 text-[#FEE715] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="p-3.5 font-bold text-white text-xs sm:text-sm">{item.keyword}</td>
                    <td className="p-3.5">{renderIntentBadge(item.intent)}</td>
                    <td className="p-3.5 text-right font-bold text-gray-200">{item.volume.toLocaleString()}</td>
                    <td className="p-3.5">{renderKDMeter(item.kd)}</td>
                    <td className="p-3.5 text-right font-semibold text-emerald-400">${item.cpc.toFixed(2)}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-1 text-xs font-extrabold rounded bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30">
                        {item.opportunity}/100
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleCopySingle(item.keyword)}
                          title="Copy Keyword"
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
                        >
                          {copiedKeyword === item.keyword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => onSaveKeyword(item)}
                          title={isBookmarked ? 'Remove Bookmark' : 'Save to List'}
                          className={`p-1.5 rounded-lg border transition ${
                            isBookmarked
                              ? 'bg-[#FEE715] text-[#101820] border-[#FEE715]'
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#101820]' : ''}`} />
                        </button>
                        <button
                          onClick={() => onSelectKeywordForSerp(item.keyword)}
                          title="Preview SERP"
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 transition"
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

    </div>
  );
}
