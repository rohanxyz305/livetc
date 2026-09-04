import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101820] text-white pt-16 pb-8 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-800/80">
          
          {/* Column 1: Company Profile & 3rd Logo Design */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-display flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-black text-2xl shadow-yellowGlow group-hover:scale-105 transition-transform shrink-0">
                  L
                </span>
                <span className="text-white font-extrabold tracking-tight">LIVETEACHCREATE</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Liveteachcreate is one of the top e-commerce service providers with 6+ years of experience. We assist companies in growing their businesses online through professional seller management for Amazon, Flipkart, Meesho, Blinkit, Zepto, Jiomart, Nykaa, and Myntra.
            </p>

            {/* Official MSME Registered Badge */}
            <div className="p-3 rounded-2xl bg-gray-900/90 border border-gray-800 inline-flex items-center gap-3 shadow-md">
              <div className="bg-white px-2 py-1 rounded-xl shrink-0">
                <img 
                  src="/msme-logo.png" 
                  alt="MSME Registered Enterprise - Micro, Small & Medium Enterprises" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#FEE715] tracking-wider block">Govt. of India Registered</span>
                <span className="text-xs font-bold text-white">MSME Enterprise</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FEE715] hover:text-[#101820] transition-colors">
                <i className="fa-brands fa-facebook text-sm"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FEE715] hover:text-[#101820] transition-colors">
                <i className="fa-brands fa-twitter text-sm"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FEE715] hover:text-[#101820] transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FEE715] hover:text-[#101820] transition-colors">
                <i className="fa-brands fa-linkedin text-sm"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FEE715] hover:text-[#101820] transition-colors">
                <i className="fa-brands fa-pinterest text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: E-Commerce Services & Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FEE715] border-b border-gray-800 pb-2">
                E-Commerce Services
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><Link to="/services/amazon-seller-account-management-services" className="hover:text-[#FEE715] transition-colors">Amazon Account Management</Link></li>
                <li><Link to="/services/flipkart-account-management-services" className="hover:text-[#FEE715] transition-colors">Flipkart Account Management</Link></li>
                <li><Link to="/services/blinkit-seller-account-management-services" className="hover:text-[#FEE715] transition-colors">Blinkit Account Management</Link></li>
                <li><Link to="/services/meesho-account-management-services" className="hover:text-[#FEE715] transition-colors">Meesho Account Management</Link></li>
                <li><Link to="/services/shopify-store-management-services" className="hover:text-[#FEE715] transition-colors">Shopify Store Management</Link></li>
                <li><Link to="/services/myntra-account-management-services" className="hover:text-[#FEE715] transition-colors">Myntra Account Management</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FEE715] border-b border-gray-800 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><Link to="/about-us" className="hover:text-[#FEE715] transition-colors">About Us</Link></li>
                <li><Link to="/portfolio" className="hover:text-[#FEE715] transition-colors">Portfolio</Link></li>
                <li><Link to="/seo-results" className="hover:text-[#FEE715] text-[#FEE715] font-bold transition-colors">🏆 SEO Case Studies & Results</Link></li>
                <li><Link to="/blogs" className="hover:text-[#FEE715] transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-[#FEE715] transition-colors">Career</Link></li>
                <li><Link to="/seo-keyword-tool" className="hover:text-[#FEE715] text-[#FEE715] font-bold transition-colors">🔍 SEO Keyword Tool</Link></li>
                <li><Link to="/ecommerce-product-listing-tool" className="hover:text-[#FEE715] text-[#FEE715] font-bold transition-colors">📦 AI Product Listing Generator</Link></li>
                <li><Link to="/email-marketing" className="hover:text-[#FEE715] text-[#FEE715]/90 font-bold transition-colors">✉️ Email Marketing</Link></li>
                <li><Link to="/contact-us" className="hover:text-[#FEE715] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FEE715] border-b border-gray-800 pb-2">
              Contact Us
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-mobile-screen text-[#FEE715] text-base"></i>
                <span>Direct / WhatsApp: <a href="https://wa.me/918904979375" target="_blank" rel="noreferrer" className="hover:text-[#FEE715] font-bold text-sm text-white">+91 8904979375</a></span>
              </div>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-envelope text-[#FEE715]"></i>
                <a href="mailto:connectliveteachcreate@gmail.com" className="hover:text-[#FEE715]">connectliveteachcreate@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2020-2026 Liveteachcreate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/disclaimer" className="hover:text-[#FEE715] transition-colors">Disclaimer</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#FEE715] transition-colors">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-[#FEE715] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-[#FEE715] text-[#101820] w-11 h-11 rounded-full shadow-yellowGlow flex items-center justify-center font-bold transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-lg"></i>
        </button>
      )}
    </footer>
  );
}
