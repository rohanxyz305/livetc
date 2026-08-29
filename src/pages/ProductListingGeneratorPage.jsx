import React from 'react';
import SEO from '../components/common/SEO';
import ProductListingGenerator from '../components/seologic/ProductListingGenerator';

export default function ProductListingGeneratorPage() {
  return (
    <>
      <SEO
        title="AI E-Commerce Product Listing Generator | Liveteachcreate"
        description="Upload product images to ImgBB and generate complete Amazon, Flipkart, Meesho, Myntra & Ajio product listings with titles, 5 bullet points, search terms, and descriptions."
      />

      <div className="relative overflow-hidden min-h-screen bg-paper-deep text-bone py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* aurora field — single marigold glow behind the generator */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <span
            className="aurora"
            style={{
              width: '420px',
              height: '420px',
              background: '#F97316',
              top: '-140px',
              left: 'calc(50% - 210px)',
              opacity: 0.25,
              animationDelay: '0s'
            }}
          ></span>
        </div>
        <ProductListingGenerator />
      </div>
    </>
  );
}
