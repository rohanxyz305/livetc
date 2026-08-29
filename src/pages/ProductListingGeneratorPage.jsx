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

      <div className="min-h-screen bg-[#101820] text-white py-12 px-4 sm:px-6 lg:px-8">
        <ProductListingGenerator />
      </div>
    </>
  );
}
