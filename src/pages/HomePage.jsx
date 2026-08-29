import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import StatsCounter from '../components/common/StatsCounter';
import ServiceCard from '../components/common/ServiceCard';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ReviewCard from '../components/common/ReviewCard';
import { servicesCategories, allServicesList } from '../data/servicesData';

export default function HomePage({ onOpenContactPopup }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Services' },
    { id: 'Marketplace Management', label: 'Marketplace Mgmt' },
    { id: 'Marketplace Onboarding', label: 'Quick Onboarding' },
    { id: 'Digital Marketing', label: 'Digital Ads' },
    { id: 'Web Development', label: 'Web Store Dev' }
  ];

  const filteredServices = activeTab === 'ALL'
    ? allServicesList.slice(0, 9)
    : allServicesList.filter(s => s.category === activeTab);

  const reviewsList = [
    { initial: 'A', name: 'Anant', stars: 5, text: 'Best ecommerce handling services and very humble and knowledgeable team. Helped us scale Amazon sales significantly.' },
    { initial: 'V', name: 'Vasist Mishra', stars: 5, text: 'Best services for e-commerce account handling. Especially Amazon PPC management. Staff is very knowledgeable and prompt.' },
    { initial: 'S', name: 'Surbhi Kumari', stars: 4, text: 'Amazon account management services grateful for increasing our order visibility.' },
    { initial: 'R', name: 'Ram Singh', stars: 5, text: 'Fantastic Flipkart and Myntra listing service. Great customer support team.' },
    { initial: 'I', name: 'Indranil', stars: 5, text: 'Thanks for increasing my monthly sales volume by 3x across marketplaces!' },
    { initial: 'S', name: 'Sushant Sharma', stars: 5, text: 'Best Amazon account management services in Jaipur. Truly professional growth agency.' }
  ];

  return (
    <>
      <SEO 
        title="E-Commerce Platform Service Providers"
        description="Liveteachcreate offers complete seller account management for Myntra, Amazon, Flipkart, Shopify, & Blinkit, including listings, inventory & PPC ads."
      />

      {/* Hero Section */}
      <HeroSection onOpenContactPopup={onOpenContactPopup} />

      {/* Key Metrics Counter */}
      <StatsCounter />

      {/* Featured Services Section with 3D Nova Futuristic Animation inside 9 service boxes */}
      <section className="py-20 bg-[#101820] text-white relative overflow-hidden border-t border-gray-800">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider shadow-yellowGlow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEE715] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FEE715]"></span>
              </span>
              <span>3D NOVA FUTURISTIC HUB</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
              End-to-End E-Commerce Account Management & Scaling
            </h2>
            <p className="text-sm text-gray-400">
              Select a category below to explore our dynamic seller management ecosystem.
            </p>
          </div>

          {/* Interactive Category Filter Bar & Live Ticker */}
          <div className="mb-12 space-y-6">
            
            {/* Animated Ticker Strip */}
            <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl py-2.5 px-4 overflow-hidden shadow-inner flex items-center gap-4 backdrop-blur-md">
              <div className="shrink-0 flex items-center gap-2 bg-[#FEE715] text-[#101820] px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-yellowGlow">
                <i className="fa-solid fa-bolt text-xs animate-bounce"></i>
                <span>Live Activity</span>
              </div>

              <div className="overflow-hidden relative w-full text-xs text-gray-300 font-semibold whitespace-nowrap">
                <div className="inline-block animate-marquee space-x-12">
                  <span>⚡ <strong className="text-[#FEE715]">1,420+ Orders</strong> Processed Today Across Client Accounts</span>
                  <span>🛡️ <strong className="text-[#FEE715]">100% Anti-Suppression Shield</strong> Active for All Sellers</span>
                  <span>📈 <strong className="text-[#FEE715]">4.9x Average ROAS</strong> Achieved on Amazon & Meta Ads</span>
                  <span>📦 <strong className="text-[#FEE715]">Real-time FBA & Dark Store Sync</strong> Operating Normally</span>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === cat.id
                      ? 'bg-[#FEE715] text-[#101820] shadow-yellowGlow scale-105'
                      : 'bg-gray-900/80 text-gray-300 border border-gray-800 hover:border-[#FEE715]/50 hover:text-white'
                  }`}
                >
                  {activeTab === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#101820] animate-pulse"></span>
                  )}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Dynamic Service Cards Grid with 3D Nova Futuristic Animation inside each box */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials / Google Reviews */}
      <section className="py-20 bg-[#101820] border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              What Indian Sellers Say About Liveteachcreate
            </h2>
            <p className="text-sm text-gray-400">
              Trusted by 300+ sellers across Flipkart, Amazon, Meesho, Shopify & Blinkit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsList.map((rev, idx) => (
              <ReviewCard key={idx} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-[#101820] via-gray-900 to-[#101820] text-white relative overflow-hidden border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display">
            Ready to Multiply Your Marketplace Revenue?
          </h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Book a complimentary seller account audit today. Our marketplace experts will identify keyword gaps, listing deficiencies, and ad spend savings.
          </p>
          <div>
            <button
              onClick={onOpenContactPopup}
              className="bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-extrabold text-sm px-10 py-4 rounded-full shadow-yellowGlow transition-transform hover:scale-105 uppercase tracking-wider"
            >
              Get Free Account Audit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
