import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ onOpenContactPopup }) {
  return (
    <section className="hero-bg relative overflow-hidden pt-12 pb-20 md:py-24 min-h-[85vh] flex items-center border-b border-gray-800">
      {/* Background Mesh Grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none"></div>

      {/* Floating Decorative Badges */}
      <div className="hidden lg:block absolute top-24 right-1/4 w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 shadow-yellowGlow flex items-center justify-center animate-float">
        <i className="fa-brands fa-amazon text-2xl text-[#FEE715]"></i>
      </div>
      <div className="hidden lg:block absolute bottom-24 left-16 w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 shadow-yellowGlow flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
        <i className="fa-solid fa-store text-xl text-blue-400"></i>
      </div>
      <div className="hidden lg:block absolute bottom-36 right-16 w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 shadow-yellowGlow flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
        <i className="fa-brands fa-shopify text-xl text-emerald-400"></i>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/90 border border-gray-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEE715] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FEE715]"></span>
              </span>
              <span className="text-[11px] font-extrabold tracking-widest text-[#FEE715] uppercase">
                INDIA'S #1 E-COMMERCE GROWTH AGENCY
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display">
              Best <span className="grad-text">E-Commerce</span> <br className="hidden sm:inline" />
              Platform Service Provider
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-medium">
              Liveteachcreate offers complete seller account management for <span className="font-bold text-[#FEE715]">Myntra, Amazon, Flipkart, Shopify, & Blinkit</span> including product listings, inventory, PPC ads & revenue scaling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenContactPopup}
                className="w-full sm:w-auto pulseBtn font-bold text-sm px-8 py-4 rounded-full shadow-yellowGlow transition-transform hover:scale-105"
              >
                Get Free Account Audit
              </button>
              
              <Link
                to="/services/amazon-seller-account-management-services"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-bold text-sm rounded-full transition-colors shadow-sm text-center"
              >
                Explore Services
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl font-black text-[#FEE715] font-display">300+</p>
                <p className="text-[11px] text-gray-400 font-semibold">Active Sellers Managed</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#FEE715] font-display">3.4x</p>
                <p className="text-[11px] text-gray-400 font-semibold">Avg Sales Multiplier</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#FEE715] font-display">6+ Yrs</p>
                <p className="text-[11px] text-gray-400 font-semibold">Marketplace Mastery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#101820]/90 backdrop-blur-xl border border-gray-800 shadow-obsidianGlow space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-chart-line text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Liveteachcreate Dashboard</h3>
                    <p className="text-[11px] text-gray-400">Live Client Performance Metrics</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-[10px] font-bold">
                  +340% Growth
                </span>
              </div>

              {/* Sample Metrics Stack */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-400">Amazon Sales Volume</span>
                    <span className="text-emerald-400 font-bold">₹42.5 Lakhs / mo</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[85%] rounded-full"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-400">Flipkart ACoS Efficiency</span>
                    <span className="text-[#FEE715] font-bold">14.2% Optimized</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#FEE715] h-full w-[92%] rounded-full"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-400">Blinkit 10-Min Inventory Sync</span>
                    <span className="text-purple-400 font-bold">100% Operational</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-[100%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 flex items-center gap-3">
                <i className="fa-solid fa-shield-halved text-[#FEE715] text-xl"></i>
                <p className="text-[11px] text-gray-300 font-medium">
                  Guaranteed compliance support, listing protection & zero account suspension risk.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
