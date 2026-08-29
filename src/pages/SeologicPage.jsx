import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import SeologicNavbar from '../components/seologic/SeologicNavbar';
import SeologicHero from '../components/seologic/SeologicHero';
import SeologicOverview from '../components/seologic/SeologicOverview';
import SeologicTable from '../components/seologic/SeologicTable';
import SeologicClusters from '../components/seologic/SeologicClusters';
import SeologicQuestions from '../components/seologic/SeologicQuestions';
import SeologicSERP from '../components/seologic/SeologicSERP';
import SeologicSaved from '../components/seologic/SeologicSaved';
import ProductListingGenerator from '../components/seologic/ProductListingGenerator';

import { fetchKeywords, fetchTopics } from '../services/seologicApi';

export default function SeologicPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentSeed, setCurrentSeed] = useState('amazon seller central');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ summary: null, keywords: [] });
  const [topics, setTopics] = useState([]);
  const [selectedSerpKeyword, setSelectedSerpKeyword] = useState('');

  // LocalStorage Saved Keywords
  const [savedKeywords, setSavedKeywords] = useState(() => {
    try {
      const saved = localStorage.getItem('seologic_saved_keywords');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('seologic_saved_keywords', JSON.stringify(savedKeywords));
  }, [savedKeywords]);

  // Handle Search Request
  const handleSearch = async (seed, mode = 'broad', country = 'us') => {
    setIsLoading(true);
    setCurrentSeed(seed);

    const result = await fetchKeywords(seed, mode, country);
    setData(result);

    const topicResult = await fetchTopics(seed);
    setTopics(topicResult);

    setIsLoading(false);
  };

  // Initial search on mount
  useEffect(() => {
    handleSearch('amazon seller central', 'broad', 'us');
  }, []);

  const handleSaveKeyword = (keywordObj) => {
    setSavedKeywords((prev) => {
      const exists = prev.some((k) => k.keyword === keywordObj.keyword);
      if (exists) {
        return prev.filter((k) => k.keyword !== keywordObj.keyword);
      }
      return [...prev, keywordObj];
    });
  };

  const handleRemoveSaved = (kwText) => {
    setSavedKeywords((prev) => prev.filter((k) => k.keyword !== kwText));
  };

  const handleClearSaved = () => {
    setSavedKeywords([]);
  };

  const handleSelectKeywordForSerp = (kwText) => {
    setSelectedSerpKeyword(kwText);
    setActiveTab('serp');
  };

  const topOpportunity = data.keywords && data.keywords.length > 0 ? data.keywords[0] : null;

  return (
    <>
      <SEO
        title="Seologic - Free SEO Keyword & AI Product Listing Tool | Liveteachcreate"
        description="Free SEO Keyword Research & AI Product Listing Studio by Liveteachcreate. Upload ImgBB images to generate Amazon, Flipkart, Meesho, Myntra & Ajio listings."
      />

      <div className="min-h-screen bg-paper-deep text-bone">

        {/* Tool Header Sub-Navbar */}
        <SeologicNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedKeywords.length}
        />

        {/* Hero Search Section (shown when on keyword tabs) */}
        {activeTab !== 'generator' && (
          <SeologicHero
            onSearch={handleSearch}
            isLoading={isLoading}
            currentSeed={currentSeed}
          />
        )}

        {/* Main Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Loading Indicator */}
          {isLoading && activeTab !== 'generator' && (
            <div className="card p-12 text-center space-y-4 animate-pop">
              <div className="w-8 h-8 border-[3px] border-marigold border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone-mute">
                Fetching autocomplete & LSI keyword metrics for "{currentSeed}"
              </p>
            </div>
          )}

          {/* Tab 1: Overview & Keyword Research Table */}
          {!isLoading && activeTab === 'overview' && (
            <div key={activeTab} className="space-y-8 animate-fade-up">
              <SeologicOverview summary={data.summary} topOpportunity={topOpportunity} />
              <SeologicTable
                keywords={data.keywords}
                onSaveKeyword={handleSaveKeyword}
                savedKeywords={savedKeywords}
                onSelectKeywordForSerp={handleSelectKeywordForSerp}
              />
            </div>
          )}

          {/* Tab 2: Questions Explorer */}
          {!isLoading && activeTab === 'questions' && (
            <div key={activeTab} className="animate-fade-up">
              <SeologicQuestions keywords={data.keywords} seed={currentSeed} />
            </div>
          )}

          {/* Tab 3: Topic Clusters */}
          {!isLoading && activeTab === 'clusters' && (
            <div key={activeTab} className="animate-fade-up">
              <SeologicClusters keywords={data.keywords} seed={currentSeed} />
            </div>
          )}

          {/* Tab 4: AI Listing Generator */}
          {activeTab === 'generator' && (
            <div key={activeTab} className="animate-fade-up">
              <ProductListingGenerator />
            </div>
          )}

          {/* Tab 5: SERP Simulator */}
          {!isLoading && activeTab === 'serp' && (
            <div key={activeTab} className="animate-fade-up">
              <SeologicSERP targetKeyword={selectedSerpKeyword || currentSeed} />
            </div>
          )}

          {/* Tab 6: Saved Project List */}
          {!isLoading && activeTab === 'saved' && (
            <div key={activeTab} className="animate-fade-up">
              <SeologicSaved
                savedKeywords={savedKeywords}
                onRemoveKeyword={handleRemoveSaved}
                onClearAll={handleClearSaved}
                onSelectKeywordForSerp={handleSelectKeywordForSerp}
              />
            </div>
          )}

        </div>

      </div>
    </>
  );
}
