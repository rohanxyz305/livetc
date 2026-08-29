import React from 'react';
import { Link } from 'react-router-dom';
import { caseStudiesList } from '../../data/caseStudiesData';

export default function CaseStudyGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Proven Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display">
              Real Brands, Measurable Growth Stories
            </h2>
            <p className="text-sm text-gray-600">
              Explore how our tailored marketplace strategies transformed regional brands into national marketplace market leaders.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
          >
            <span>View All Case Studies</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudiesList.map((cs) => (
            <div
              key={cs.slug}
              className="card-hover rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] uppercase font-bold tracking-wider">
                    {cs.platform}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{cs.category}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">{cs.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{cs.summary}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xl font-extrabold text-red-600 font-display">{cs.metrics.revenueGrowth}</p>
                    <p className="text-[10px] text-gray-500">Sales Growth</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-blue-600 font-display">{cs.metrics.acosReduction}</p>
                    <p className="text-[10px] text-gray-500">ACoS Reduction</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-purple-600 font-display">{cs.metrics.listingRank}</p>
                    <p className="text-[10px] text-gray-500">Search Rank</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 px-8 py-4 flex items-center justify-between border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-700">Full Strategy Breakdown</span>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
                >
                  <span>Read Case Study</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
