import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesCategories } from '../../data/servicesData';

/* Mega-menu column rotation — one hue per category column:
   marigold → pine → violet → royal */
const colRuleClass = ['bg-marigold', 'bg-pine', 'bg-violet', 'bg-royal'];
const colTextClass = ['text-marigold', 'text-pine', 'text-violet', 'text-royal'];

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

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-ink/70 py-2 shadow-lift backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-3.5'
      }`}
    >
      <div className="shell">
        <div className="flex items-center justify-between gap-6">

          {/* Logo — marigold square offset behind ink square, serif L */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span className="relative inline-flex">
              <span aria-hidden="true" className="absolute -left-1 -top-1 h-3.5 w-3.5 bg-marigold shadow-glowmarigold"></span>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/15 bg-ink font-display text-lg font-semibold text-bone">
                L
              </span>
            </span>
            <span className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-bone">
              LIVETEACHCREATE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            <Link
              to="/"
              className={`link-underline relative py-1 ${isActive('/') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              Home
              {isActive('/') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>

            {/* Services Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`link-underline flex items-center gap-1.5 py-2 ${isActive('/services') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
              >
                <span>Services</span>
                <i className={`fas fa-angle-down text-[10px] transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-marigold' : ''}`}></i>
                {isActive('/services') && (
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
                )}
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[95vw] max-w-6xl -translate-x-1/2">
                  <div className="animate-pop rounded-md border border-white/10 bg-cream p-8 shadow-hard grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {servicesCategories.map((cat, catIdx) => (
                      <div key={cat.id} className="space-y-4 border-white/10 md:border-r md:pr-6 md:last:border-0">
                        <div>
                          <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-bone-mute">
                            {cat.title}
                          </h3>
                          <span aria-hidden="true" className={`mt-2 block h-px w-8 ${colRuleClass[catIdx % colRuleClass.length]}`}></span>
                        </div>
                        <ul className="space-y-1">
                          {cat.services.map((serv) => (
                            <li key={serv.slug}>
                              <Link
                                to={`/services/${serv.slug}`}
                                className="group flex items-center gap-2.5 py-1.5 text-sm text-bone-mute transition-colors hover:text-bone"
                              >
                                <i className={`${serv.icon} w-4 text-center text-xs ${colTextClass[catIdx % colTextClass.length]}`}></i>
                                <span className="font-medium">{serv.name}</span>
                                <i className={`fas fa-arrow-right ml-auto text-[10px] ${colTextClass[catIdx % colTextClass.length]} opacity-0 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100`}></i>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about-us"
              className={`link-underline relative py-1 ${isActive('/about-us') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              About Us
              {isActive('/about-us') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>
            <Link
              to="/portfolio"
              className={`link-underline relative py-1 ${isActive('/portfolio') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              Portfolio
              {isActive('/portfolio') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>
            <Link
              to="/blogs"
              className={`link-underline relative py-1 ${isActive('/blogs') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              Blog
              {isActive('/blogs') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>
            <Link
              to="/careers"
              className={`link-underline relative py-1 ${isActive('/careers') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              Careers
              {isActive('/careers') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>
            <Link
              to="/seo-keyword-tool"
              className={`link-underline relative flex items-center gap-1.5 py-1 ${isActive('/seo-keyword-tool') ? 'text-marigold' : 'text-bone/70 hover:text-bone'}`}
            >
              <i className="fa-solid fa-magnifying-glass text-[11px] text-pine"></i>
              <span>SEO Tool</span>
              {isActive('/seo-keyword-tool') && (
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-1 animate-blink rounded-full bg-marigold"></span>
              )}
            </Link>
          </nav>

          {/* Contact Button */}
          <div className="hidden items-center lg:flex">
            <button onClick={onOpenContactPopup} className="btn btn-primary btn-sweep px-5 py-2.5">
              Book free audit
              <i className="fas fa-arrow-right btn-arrow"></i>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-xl text-bone/80 transition-colors hover:text-bone lg:hidden"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="animate-fade-up relative z-10 flex h-full w-80 max-w-full flex-col justify-between overflow-y-auto border-r border-white/10 bg-ink/95 p-6 shadow-lift backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <span className="relative inline-flex">
                    <span aria-hidden="true" className="absolute -left-1 -top-1 h-2.5 w-2.5 bg-marigold shadow-glowmarigold"></span>
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-[3px] border border-white/15 bg-ink font-display text-base font-semibold text-bone">
                      L
                    </span>
                  </span>
                  <span className="font-display text-base font-semibold tracking-tight text-bone">
                    LIVETEACHCREATE
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Navigation Menu"
                  className="flex h-8 w-8 items-center justify-center text-bone-mute transition-colors hover:text-bone"
                >
                  <i className="fas fa-xmark"></i>
                </button>
              </div>

              <nav className="font-display text-xl text-bone">
                <Link to="/" className="flex items-center justify-between border-b border-white/10 py-4">
                  Home
                </Link>

                <div className="border-b border-white/10">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-xl text-bone"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>Services</span>
                    <i className={`fas fa-angle-down text-xs text-bone-mute transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {mobileServicesOpen && (
                    <div className="space-y-5 border-l border-white/15 pb-5 pl-4">
                      {servicesCategories.map((cat) => (
                        <div key={cat.id} className="space-y-1.5">
                          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-bone-faint">
                            {cat.title}
                          </p>
                          {cat.services.map((serv) => (
                            <Link
                              key={serv.slug}
                              to={`/services/${serv.slug}`}
                              className="block py-1 font-sans text-sm text-bone-mute transition-colors hover:text-pine"
                            >
                              {serv.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/about-us" className="flex items-center justify-between border-b border-white/10 py-4">
                  About Us
                </Link>
                <Link to="/portfolio" className="flex items-center justify-between border-b border-white/10 py-4">
                  Portfolio
                </Link>
                <Link to="/blogs" className="flex items-center justify-between border-b border-white/10 py-4">
                  Blog
                </Link>
                <Link to="/careers" className="flex items-center justify-between border-b border-white/10 py-4">
                  Careers
                </Link>
                <Link to="/seo-keyword-tool" className="flex items-center gap-2.5 border-b border-white/10 py-4">
                  <i className="fa-solid fa-magnifying-glass text-sm text-pine"></i>
                  <span>SEO Keyword Tool</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactPopup();
                }}
                className="btn btn-primary btn-sweep w-full"
              >
                Book free audit
                <i className="fas fa-arrow-right btn-arrow"></i>
              </button>
              <p className="mt-4 text-center font-mono text-[11px] tracking-wide text-bone-faint">
                Direct: +91 9109266248
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
