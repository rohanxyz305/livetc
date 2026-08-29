import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesCategories } from '../../data/servicesData';

export default function Navbar({ onOpenContactPopup }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#101820] shadow-2xl py-2.5 border-b border-gray-800' : 'bg-[#101820]/95 backdrop-blur-md py-3.5 border-b border-gray-800/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-2xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-black text-2xl font-display shadow-yellowGlow group-hover:scale-105 transition-transform shrink-0">
              L
            </span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
              LIVETEACHCREATE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-gray-200">
            <Link to="/" className="hover:text-[#FEE715] transition-colors">
              Home
            </Link>

            {/* Services Mega Menu Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1.5 hover:text-[#FEE715] py-2 transition-colors">
                <span>Services</span>
                <i className={`fas fa-angle-down text-xs transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#FEE715]' : ''}`}></i>
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-6xl bg-[#101820] shadow-2xl rounded-2xl border border-gray-800 p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {servicesCategories.map((cat) => (
                    <div key={cat.id} className="space-y-4 border-r last:border-0 border-gray-800 pr-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#FEE715] border-b border-gray-800 pb-2">
                        {cat.title}
                      </h3>
                      <ul className="space-y-2 text-xs">
                        {cat.services.map((serv) => (
                          <li key={serv.slug}>
                            <Link 
                              to={`/services/${serv.slug}`}
                              className="flex items-center gap-2 text-gray-300 hover:text-[#FEE715] hover:translate-x-1 transition-all py-1"
                            >
                              <i className={`${serv.icon} text-[#FEE715] w-4 text-center`}></i>
                              <span className="font-medium">{serv.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about-us" className="hover:text-[#FEE715] transition-colors">
              About Us
            </Link>
            <Link to="/portfolio" className="hover:text-[#FEE715] transition-colors">
              Portfolio
            </Link>
            <Link to="/blogs" className="hover:text-[#FEE715] transition-colors">
              Blog
            </Link>
            <Link to="/careers" className="hover:text-[#FEE715] transition-colors">
              Careers
            </Link>
            <Link to="/seo-keyword-tool" className="hover:text-[#FEE715] text-[#FEE715] font-bold transition-colors flex items-center gap-1">
              <span>🔍 SEO Tool</span>
            </Link>
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenContactPopup}
              className="pulseBtn font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-yellowGlow hover:scale-105"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-2xl text-white p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="relative w-80 max-w-full bg-[#101820] border-r border-gray-800 h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#FEE715] text-[#101820] flex items-center justify-center font-black text-lg shadow-yellowGlow shrink-0">
                    L
                  </span>
                  <span className="text-lg font-extrabold text-white font-display">
                    LIVETEACHCREATE
                  </span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="text-xl text-gray-400">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4 font-semibold text-sm text-gray-200">
                <Link to="/" className="block py-2 hover:text-[#FEE715]">Home</Link>

                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex justify-between items-center py-2 hover:text-[#FEE715]"
                  >
                    <span>Services</span>
                    <i className={`fas fa-angle-down text-xs transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 space-y-4 pt-2 pb-4 text-xs border-l-2 border-[#FEE715]/40">
                      {servicesCategories.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <p className="font-bold text-[#FEE715] uppercase text-[10px] tracking-wider">{cat.title}</p>
                          {cat.services.map((serv) => (
                            <Link
                              key={serv.slug}
                              to={`/services/${serv.slug}`}
                              className="block py-1 text-gray-300 hover:text-[#FEE715]"
                            >
                              {serv.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/about-us" className="block py-2 hover:text-[#FEE715]">About Us</Link>
                <Link to="/portfolio" className="block py-2 hover:text-[#FEE715]">Portfolio</Link>
                <Link to="/blogs" className="block py-2 hover:text-[#FEE715]">Blog</Link>
                <Link to="/careers" className="block py-2 hover:text-[#FEE715]">Careers</Link>
                <Link to="/seo-keyword-tool" className="block py-2 text-[#FEE715] font-bold">🔍 SEO Keyword Tool</Link>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactPopup();
                }}
                className="w-full pulseBtn font-bold text-sm py-3 rounded-xl shadow-yellowGlow"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
