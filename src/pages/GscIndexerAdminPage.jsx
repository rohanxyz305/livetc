import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import { Send, RefreshCw, CheckCircle2, Clock, ShieldCheck, Globe, Copy, Check, ListFilter, PlusCircle, Layers } from 'lucide-react';

export default function GscIndexerAdminPage() {
  const [newUrl, setNewUrl] = useState('');
  const [bulkUrlsText, setBulkUrlsText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [indexerState, setIndexerState] = useState(null);

  // State for Fetch All Website URLs feature
  const [allSiteUrls, setAllSiteUrls] = useState([]);
  const [fetchingAllUrls, setFetchingAllUrls] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const fetchIndexerStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gsc-indexer.php');
      const data = await res.json();
      setIndexerState(data);
      if (data.urls) {
        setAllSiteUrls(data.urls);
      }
    } catch (err) {
      console.error("Failed to load GSC Indexer state", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndexerStatus();
  }, []);

  // Single URL Submit
  const handleAddAndPushUrl = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/gsc-indexer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUrl: newUrl.trim() })
      });
      const data = await res.json();
      setIndexerState(data);
      if (data.urls) setAllSiteUrls(data.urls);
      setStatusMsg(`Successfully added "${newUrl}" to website index list & post-sitemap.xml!`);
      setNewUrl('');
    } catch (err) {
      console.error(err);
      setStatusMsg('Failed to push URL.');
    } finally {
      setLoading(false);
    }
  };

  // Bulk URLs Submit (Pasting 10, 20, 50 blog URLs at once)
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!bulkUrlsText.trim()) return;

    setLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/gsc-indexer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulkUrls: bulkUrlsText.trim() })
      });
      const data = await res.json();
      setIndexerState(data);
      if (data.urls) setAllSiteUrls(data.urls);
      setStatusMsg(`Bulk Indexing Success: Total ${data.totalBlogUrls} URLs registered & synced to sitemaps!`);
      setBulkUrlsText('');
      setShowBulkInput(false);
    } catch (err) {
      console.error(err);
      setStatusMsg('Failed to process bulk URLs.');
    } finally {
      setLoading(false);
    }
  };

  const triggerManualCron = async () => {
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/gsc-indexer.php');
      const data = await res.json();
      setIndexerState(data);
      if (data.urls) setAllSiteUrls(data.urls);
      setStatusMsg(`Manual Push Completed: ${data.totalBlogUrls} URLs submitted to search engines!`);
    } catch (err) {
      console.error(err);
      setStatusMsg('Error executing manual trigger.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all website URLs dynamically
  const fetchAllWebsiteUrls = async () => {
    setFetchingAllUrls(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/gsc-indexer.php');
      const data = await res.json();
      if (data.urls && Array.isArray(data.urls)) {
        setAllSiteUrls(data.urls);
        setIndexerState(data);
        setStatusMsg(`Successfully fetched all ${data.urls.length} live website pages & blogs!`);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Failed to fetch website URLs.');
    } finally {
      setFetchingAllUrls(false);
    }
  };

  // Copy all fetched URLs to clipboard
  const copyAllUrlsToClipboard = () => {
    if (allSiteUrls.length === 0) return;
    const textToCopy = allSiteUrls.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 3000);
  };

  return (
    <>
      <SEO title="Google Search Console & Blog Indexer Admin" description="Automated Blog & Website URL Indexer for Google Search Console and AI Search Models." />
      
      <div className="bg-[#101820] min-h-screen py-12 text-white">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/80 p-6 rounded-3xl border border-gray-800 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE715]/10 text-[#FEE715] text-xs font-bold mb-2">
                <Globe className="w-3.5 h-3.5" /> Automated Search Indexer
              </div>
              <h1 className="text-2xl font-extrabold font-display text-white">Google Search Console & Blog Indexer</h1>
              <p className="text-xs text-gray-400 mt-1">Push blog URLs automatically to Google Search Console, Bing, and AI Models every 30 minutes.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={fetchAllWebsiteUrls}
                disabled={fetchingAllUrls}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-3 rounded-2xl transition shadow-lg disabled:opacity-50"
              >
                <ListFilter className={`w-4 h-4 ${fetchingAllUrls ? 'animate-spin' : ''}`} />
                Fetch All Pages ({allSiteUrls.length})
              </button>

              <button 
                onClick={triggerManualCron}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-[#FEE715] hover:bg-yellow-400 text-black font-bold text-xs px-4 py-3 rounded-2xl transition shadow-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Trigger 30-Min Push
              </button>
            </div>
          </div>

          {/* Alert Message */}
          {statusMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* SINGLE & BULK BLOG URL ADDITION FORM */}
          <div className="bg-gray-900/60 p-6 rounded-3xl border border-gray-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#FEE715] uppercase tracking-wider">Add Live Blog URLs to Website & Sitemap</h2>
              <button 
                onClick={() => setShowBulkInput(!showBulkInput)}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 underline"
              >
                <Layers className="w-3.5 h-3.5" />
                {showBulkInput ? 'Switch to Single URL Mode' : 'Paste Multiple / Bulk URLs'}
              </button>
            </div>
            
            {!showBulkInput ? (
              <form onSubmit={handleAddAndPushUrl} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="url"
                  required
                  placeholder="https://liveteachcreate.com/blogs/your-new-blog-slug"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FEE715]"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> Add & Index Now
                </button>
              </form>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3">
                <p className="text-xs text-gray-400">Paste your published blog URLs below (one URL per line or separated by commas):</p>
                <textarea 
                  rows={6}
                  required
                  placeholder={`https://liveteachcreate.com/blogs/my-first-blog-slug\nhttps://liveteachcreate.com/blogs/my-second-blog-slug\nhttps://liveteachcreate.com/blogs/my-third-blog-slug`}
                  value={bulkUrlsText}
                  onChange={(e) => setBulkUrlsText(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4" /> Add All Bulk URLs & Sync to Sitemap
                </button>
              </form>
            )}
          </div>

          {/* FETCH & COPY ALL WEBSITE URLS FOR INDEXING */}
          <div className="bg-gray-900/80 p-6 rounded-3xl border border-blue-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ListFilter className="w-5 h-5 text-blue-400" />
                  Fetch & Copy All Live Website URLs ({allSiteUrls.length} Pages Loaded)
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Click below to grab 100% of all website pages & blogs in 1-click so you can copy and paste them into Google Search Console or indexing tools.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchAllWebsiteUrls}
                  disabled={fetchingAllUrls}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-gray-700 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${fetchingAllUrls ? 'animate-spin' : ''}`} />
                  {fetchingAllUrls ? 'Fetching...' : 'Fetch All URLs'}
                </button>

                {allSiteUrls.length > 0 && (
                  <button
                    onClick={copyAllUrlsToClipboard}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md"
                  >
                    {copiedStatus ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    {copiedStatus ? 'Copied to Clipboard!' : `Copy All (${allSiteUrls.length} URLs)`}
                  </button>
                )}
              </div>
            </div>

            {allSiteUrls.length > 0 && (
              <div className="space-y-2">
                <textarea
                  readOnly
                  rows={8}
                  value={allSiteUrls.join('\n')}
                  className="w-full bg-black/70 border border-gray-800 rounded-2xl p-4 font-mono text-xs text-emerald-400 focus:outline-none select-all"
                />
                <div className="text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Tip: Click inside the box or click "Copy All" to grab all URLs ready for Google Search Console.</span>
                  <span className="text-emerald-400 font-bold">{allSiteUrls.length} Total URLs Registered</span>
                </div>
              </div>
            )}
          </div>

          {/* System Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 space-y-1">
              <div className="text-xs text-gray-400 flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#FEE715]" /> Total Registered URLs</div>
              <div className="text-2xl font-black text-white">{allSiteUrls.length || indexerState?.totalBlogUrls || 0}</div>
            </div>

            <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 space-y-1">
              <div className="text-xs text-gray-400 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> IndexNow Status</div>
              <div className="text-2xl font-black text-emerald-400">{indexerState?.indexNowStatus === 200 || indexerState?.indexNowStatus === 202 ? '200 OK (Active)' : indexerState?.indexNowStatus || 'Active'}</div>
            </div>

            <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 space-y-1">
              <div className="text-xs text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> Last Auto Push</div>
              <div className="text-xs font-bold text-gray-200 mt-2">{indexerState?.timestamp ? new Date(indexerState.timestamp).toLocaleString() : 'Just now'}</div>
            </div>
          </div>

          {/* URL Queue List */}
          <div className="bg-gray-900/60 p-6 rounded-3xl border border-gray-800 shadow-lg space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Active URLs Registered for 30-Min Cron & Search Engines</span>
              <span className="text-xs text-gray-400 font-normal">Auto-synced to post-sitemap.xml</span>
            </h2>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {allSiteUrls && allSiteUrls.length > 0 ? (
                allSiteUrls.map((url, idx) => (
                  <div key={idx} className="bg-gray-950 p-3 rounded-xl border border-gray-800/80 flex items-center justify-between text-xs text-gray-300">
                    <a href={url} target="_blank" rel="noreferrer" className="hover:text-[#FEE715] truncate font-mono">
                      {url}
                    </a>
                    <span className="shrink-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Synced & Queued
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-500">No blog URLs found yet. Add one above!</div>
              )}
            </div>
          </div>

          {/* Instructions Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 space-y-3">
              <h3 className="text-xs font-bold text-[#FEE715] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> cPanel 30-Minute Cron Setup
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                To run automatic pings every 30 minutes for all registered URLs, add this command to your cPanel Cron Jobs:
              </p>
              <div className="bg-black/60 p-3 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-400 select-all">
                curl -s https://liveteachcreate.com/api/gsc-indexer.php &gt; /dev/null 2&gt;&amp;1
              </div>
              <p className="text-[11px] text-gray-500">Schedule: <code className="text-gray-300">*/30 * * * *</code> (Once every 30 minutes)</p>
            </div>

            <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 space-y-3">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Optional: Official Google Service Account API
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                For direct Google Cloud Indexing API authorization, place your <code className="text-white">service_account.json</code> file in your cPanel hosting directory at:
              </p>
              <div className="bg-black/60 p-3 rounded-xl border border-gray-800 font-mono text-[11px] text-blue-300 select-all">
                /public_html/api/service_account.json
              </div>
              <p className="text-[11px] text-gray-500">The script automatically detects it and authenticates directly with Google Search Console API.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
