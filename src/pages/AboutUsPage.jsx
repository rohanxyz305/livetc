import React from 'react';
import SEO from '../components/common/SEO';
import StatsCounter from '../components/common/StatsCounter';

export default function AboutUsPage({ onOpenContactPopup }) {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn more about Liveteachcreate, India's leading e-commerce account management and growth agency based in Bengaluru, Kolkata, and Dhanbad." 
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            About Liveteachcreate
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Empowering Indian manufacturers, brand owners, and D2C startups to scale multi-channel sales across top online marketplaces.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-white font-display">
                6+ Years of E-Commerce Growth Mastery
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We are based in Bengaluru, Kolkata, and Dhanbad. Liveteachcreate has grown into one of India's premier e-commerce service providers. We specialize in end-to-end account handling, product cataloging, advertising management, and quick-commerce onboarding for Myntra, Amazon, Flipkart, Blinkit, Zepto, Jiomart, Nykaa, and Shopify.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our mission is simple: to eliminate operational complexities for sellers, optimize advertising budgets for maximum ROAS, and elevate brand visibility across domestic and global channels.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div className="space-y-1">
                  <h4 className="font-bold text-[#FEE715] text-lg">Our Vision</h4>
                  <p className="text-xs text-gray-400">To be India's most trusted growth accelerator for D2C brands and marketplace sellers.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#FEE715] text-lg">Our Values</h4>
                  <p className="text-xs text-gray-400">Transparency, empirical ad performance, continuous listing optimization & seller compliance.</p>
                </div>
              </div>

              <div>
                <button
                  onClick={onOpenContactPopup}
                  className="pulseBtn font-bold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-yellowGlow"
                >
                  Partner With Us
                </button>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-display border-b border-gray-800 pb-4">
                What Sets Liveteachcreate Apart?
              </h3>
              
              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h5 className="font-bold text-white">Dedicated Account Managers</h5>
                    <p className="text-gray-400">A single point of contact overseeing your cataloging, PPC ads, and weekly account audits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h5 className="font-bold text-white">In-House Graphic & Content Studio</h5>
                    <p className="text-gray-400">Professional designers crafting A+ content, brand stores, and lifestyle infographics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE715] text-[#101820] flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h5 className="font-bold text-white">Quick Commerce Expertise</h5>
                    <p className="text-gray-400">Specialized onboarding for 10-minute delivery apps like Blinkit, Instamart & Zepto.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}
