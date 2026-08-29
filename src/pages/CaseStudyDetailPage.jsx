import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { caseStudiesList } from '../data/caseStudiesData';

export default function CaseStudyDetailPage({ onOpenContactPopup }) {
  const { slug } = useParams();
  const cs = caseStudiesList.find(c => c.slug === slug);

  if (!cs) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      <SEO 
        title={`${cs.title} Case Study`} 
        description={cs.summary} 
      />

      <div className="bg-gradient-to-b from-red-50 to-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-600">
            <span>{cs.platform}</span>
            <span>•</span>
            <span>{cs.category}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-display">
            {cs.title} Case Study
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {cs.summary}
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center">
              <p className="text-3xl font-extrabold text-red-600 font-display">{cs.metrics.revenueGrowth}</p>
              <p className="text-xs text-gray-600 font-bold mt-1">Sales Growth</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-3xl font-extrabold text-blue-600 font-display">{cs.metrics.acosReduction}</p>
              <p className="text-xs text-gray-600 font-bold mt-1">ACoS Reduction</p>
            </div>
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <p className="text-3xl font-extrabold text-purple-600 font-display">{cs.metrics.listingRank}</p>
              <p className="text-xs text-gray-600 font-bold mt-1">Search Rank</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed border-t pt-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display mb-2 text-red-600">The Challenge</h3>
              <p className="bg-gray-50 p-6 rounded-2xl border border-gray-200">{cs.challenge}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display mb-2 text-red-600">Liveteachcreate's Solution</h3>
              <p className="bg-gray-50 p-6 rounded-2xl border border-gray-200">{cs.solution}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display mb-4 text-red-600">Key Results Delivered</h3>
              <ul className="space-y-3">
                {cs.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                    <i className="fa-solid fa-check text-emerald-600 mt-0.5"></i>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gray-900 text-white text-center space-y-6">
            <h3 className="text-2xl font-bold font-display">Achieve Similar Scaling Results for Your Brand</h3>
            <p className="text-xs text-gray-300 max-w-xl mx-auto">
              Our e-commerce strategy team will audit your current listings and present a customized 90-day growth plan.
            </p>
            <button
              onClick={onOpenContactPopup}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-glow"
            >
              Request Free Audit
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
