import React from 'react';
import SEO from '../components/common/SEO';

export default function CareerPage() {
  const jobOpenings = [
    { title: "SEO Engineer", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2-4 Years", desc: "Expert in technical SEO, core web vitals, keyword indexing, schema architecture, and high-authority link acquisition." },
    { title: "Agentic Developer", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2-5 Years", desc: "Hands-on experience building autonomous AI agents, ReactJS frontend architectures, REST/GraphQL APIs, and workflow automation." },
    { title: "Meta Ads Manager", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "3+ Years", desc: "Proven track record managing high-budget Meta (Facebook/Instagram) ad campaigns, CAC reduction, DPA catalog scaling, and ROAS optimization." },
    { title: "Social Media Manager", location: "Jaipur (On-site / Hybrid)", type: "Full-Time", exp: "2+ Years", desc: "Creative visual storyteller skilled in reels production, community engagement, brand strategy, content calendars, and viral growth." }
  ];

  return (
    <>
      <SEO 
        title="Careers at Liveteachcreate" 
        description="Join India's premier tech and e-commerce growth team. Open roles for SEO Engineer, Agentic Developer, Meta Ads Manager, and Social Media Manager." 
      />

      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Careers at Liveteachcreate
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Build your career alongside passion-driven tech and growth specialists shaping the future of Indian e-commerce & AI.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#101820] text-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display mb-6">Current Openings</h2>
          {jobOpenings.map((job, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#FEE715]/40 transition-colors">
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-white font-display">{job.title}</h3>
                  <span className="px-2.5 py-0.5 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-full text-[10px] font-bold uppercase">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs text-[#FEE715]">{job.location} • Experience: {job.exp}</p>
                <p className="text-xs text-gray-400 leading-relaxed pt-1">{job.desc}</p>
              </div>

              <a
                href={`mailto:info@liveteachcreate.com?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                className="shrink-0 px-6 py-3 bg-[#FEE715] hover:bg-[#e0ca00] text-[#101820] font-bold text-xs rounded-xl text-center shadow-yellowGlow transition-transform hover:scale-105"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
