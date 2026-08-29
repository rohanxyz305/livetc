import React from 'react';
import SEO from '../components/common/SEO';
import StatsCounter from '../components/common/StatsCounter';

export default function PortfolioPage({ onOpenContactPopup }) {
  return (
    <>
      <SEO 
        title="Portfolio & Client Success Stories" 
        description="Explore Liveteachcreate's portfolio of successful seller account management and revenue scaling across Amazon, Flipkart, Myntra & Blinkit." 
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Our Work & Impact
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Portfolio & Partner Brand Ecosystem
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Discover how we help leading Indian brands achieve multi-fold revenue growth and category leadership across top marketplaces.
          </p>
        </div>
      </div>

      <StatsCounter />

      <section className="py-20 bg-[#101820] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-extrabold text-white font-display">
            Driving Scale Across Every Major Channel
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            From Amazon A+ cataloging and Flipkart ad optimization to 10-minute quick commerce dark store distribution on Blinkit, Instamart & Zepto.
          </p>
          <div>
            <button
              onClick={onOpenContactPopup}
              className="pulseBtn font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-yellowGlow"
            >
              Get Free Brand Growth Audit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
