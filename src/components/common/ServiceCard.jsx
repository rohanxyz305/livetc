import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, index = 0 }) {
  return (
    <div 
      className="card-hover p-6 rounded-3xl bg-[#101820] border border-gray-800 flex flex-col justify-between relative group shadow-lg text-white overflow-hidden perspective-1000"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ========================================================================= */}
      {/* 3D NOVA FUTURISTIC ANIMATION INSIDE CARD BOX                              */}
      {/* ========================================================================= */}
      <div className="absolute -top-12 -right-12 w-56 h-56 pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 overflow-hidden">
        
        {/* Pulsing Nova Core Energy Center */}
        <div className="absolute inset-12 rounded-full bg-[#FEE715]/20 border border-[#FEE715]/40 nova-core-pulse flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#FEE715] shadow-yellowGlow"></div>
        </div>

        {/* 3D Expanding Shockwave Vector Rings */}
        <svg 
          className="w-full h-full text-[#FEE715] absolute inset-0 nova-shockwave-ring" 
          viewBox="0 0 200 200" 
          fill="none"
        >
          <polygon 
            points="100,20 170,60 170,140 100,180 30,140 30,60" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="10 5"
            opacity="0.75"
          />
        </svg>

        <svg 
          className="w-full h-full text-[#FEE715] absolute inset-0 nova-shockwave-ring" 
          style={{ animationDelay: '1.5s' }}
          viewBox="0 0 200 200" 
          fill="none"
        >
          <circle 
            cx="100" 
            cy="100" 
            r="65" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeDasharray="6 4"
            opacity="0.9"
          />
        </svg>

        {/* Holographic Laser Beams & Futuristic Matrix Nodes */}
        <div className="absolute top-10 left-10 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FEE715] to-transparent nova-laser-beam"></div>
        <div className="absolute bottom-12 right-12 w-28 h-0.5 bg-gradient-to-r from-transparent via-[#FEE715] to-transparent nova-laser-beam" style={{ animationDelay: '1s' }}></div>

        <div className="absolute top-6 right-16 text-[9px] font-mono font-bold text-[#FEE715] opacity-80 tracking-widest uppercase">
          NOVA-3D
        </div>
        <div className="absolute bottom-8 left-14 text-[8px] font-mono text-gray-400 opacity-60">
          CORE // v2.6
        </div>
      </div>

      {/* Main Card Content */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 text-[#FEE715] border border-gray-800 flex items-center justify-center text-2xl group-hover:bg-[#FEE715] group-hover:text-[#101820] transition-colors duration-300 shadow-yellowGlow group-hover:rotate-6">
            <i className={service.icon}></i>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/20 rounded-full text-[10px] uppercase tracking-wider font-extrabold backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FEE715] animate-ping"></span>
            <span>{service.category}</span>
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-[#FEE715] transition-colors font-display">
          {service.name}
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed">
          {service.shortDesc}
        </p>

        <ul className="space-y-1.5 pt-2 border-t border-gray-800/80">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="text-[11px] text-gray-300 flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-[#FEE715] text-[10px]"></i>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-4 border-t border-gray-800/60 relative z-10">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#FEE715] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Explore Service</span>
          <i className="fas fa-arrow-right text-[10px]"></i>
        </Link>
      </div>
    </div>
  );
}
