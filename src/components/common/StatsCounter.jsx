import React from 'react';

export default function StatsCounter() {
  const stats = [
    { number: "6+", label: "Years Experience", desc: "Dedicated e-commerce growth expertise" },
    { number: "300+", label: "Customers Handled", desc: "Brands scaled across Indian marketplaces" },
    { number: "₹40 Lac+", label: "Client GMV Generated", desc: "Direct sales delivered through strategic management" },
    { number: "90%", label: "Client Retention Rate", desc: "Long-term partnership & ongoing optimization" }
  ];

  return (
    <section className="py-16 bg-[#101820] text-white relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md hover:border-[#FEE715]/60 hover:shadow-yellowGlow transition-all">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FEE715] font-display mb-2">
                {st.number}
              </p>
              <h4 className="font-bold text-sm sm:text-base mb-1 text-white">{st.label}</h4>
              <p className="text-xs text-gray-400">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
