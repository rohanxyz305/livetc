import React from 'react';
import SEO from '../components/common/SEO';

export default function CoursePage({ onOpenContactPopup }) {
  return (
    <>
      <SEO 
        title="Practical E-Commerce Training Course in Jaipur" 
        description="Master Amazon seller central, Flipkart advertising, cataloging, and quick-commerce onboarding with Liveteachcreate's hands-on e-commerce training course." 
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Hands-On Training
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Practical E-Commerce Masterclass in Jaipur
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Learn live seller central management, PPC campaign optimization, and marketplace scaling from active industry experts.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <i className="fa-solid fa-clock text-[#FEE715] text-2xl"></i>
              <h4 className="font-bold text-white text-sm">Course Duration</h4>
              <p className="text-xs text-gray-400">6 Weeks Intensive Practical Training</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <i className="fa-solid fa-laptop-file text-[#FEE715] text-2xl"></i>
              <h4 className="font-bold text-white text-sm">Live Account Practice</h4>
              <p className="text-xs text-gray-400">Work directly on active seller accounts</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <i className="fa-solid fa-graduation-cap text-[#FEE715] text-2xl"></i>
              <h4 className="font-bold text-white text-sm">Certification & Placement</h4>
              <p className="text-xs text-gray-400">100% Placement assistance support</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 text-white text-center space-y-6">
            <h2 className="text-2xl font-bold font-display">Enrol Now in Upcoming Batch</h2>
            <p className="text-xs text-gray-300 max-w-xl mx-auto">
              Limited seats available for personalized mentoring. Reserve your spot for the next weekend batch.
            </p>
            <button
              onClick={onOpenContactPopup}
              className="bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-extrabold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider shadow-yellowGlow"
            >
              Inquire Course Details
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
