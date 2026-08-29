import React from 'react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "fa-solid fa-user-gear",
      title: "Dedicated Account Specialist",
      desc: "Get a single point of contact and an expert team managing your marketplace accounts daily."
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Data-Driven PPC Management",
      desc: "Maximize Return on Ad Spend (ROAS) and minimize wasted ad dollars with keyword bid tuning."
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "A+ Graphic & Cataloging Team",
      desc: "In-house graphic designers crafting brand stores, A+ content, and high-converting gallery images."
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Quick-Commerce Onboarding",
      desc: "Fast-track onboarding on Blinkit, Swiggy Instamart & Zepto dark stores across Indian metros."
    },
    {
      icon: "fa-solid fa-headset",
      title: "Transparent Weekly Reporting",
      desc: "Regular performance reports detailing organic sales, ad spend, inventory levels & growth action plans."
    },
    {
      icon: "fa-solid fa-shield-check",
      title: "Account Health Maintenance",
      desc: "Proactive management to prevent policy violations, listing suppression, or seller account suspensions."
    }
  ];

  return (
    <section className="py-20 bg-[#101820] border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Why Choose Liveteachcreate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            The Preferred E-Commerce Partner for Ambitious Brands
          </h2>
          <p className="text-sm text-gray-400">
            We provide full-funnel management so you can focus on product manufacturing while we handle online sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 shadow-lg hover:border-[#FEE715]/60 hover:shadow-yellowGlow transition-all duration-300 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center text-2xl shadow-yellowGlow font-bold">
                <i className={item.icon}></i>
              </div>
              <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
