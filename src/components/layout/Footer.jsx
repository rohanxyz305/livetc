import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal.jsx';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const quickTools = [
    { to: '/seo-keyword-tool', label: 'SEO Keyword Tool', icon: 'fa-solid fa-magnifying-glass' },
    { to: '/ecommerce-product-listing-tool', label: 'AI Product Listing Generator', icon: 'fa-solid fa-box-open' },
    { to: '/email-marketing', label: 'Email Marketing', icon: 'fa-solid fa-envelope' },
  ];

  return (
    <footer className="band band-ink relative overflow-hidden pb-10 sm:pb-12">
      <div className="shell relative">

        {/* Wordmark */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-10 sm:gap-5">
          <span className="relative inline-flex shrink-0">
            <span aria-hidden="true" className="absolute -left-1.5 -top-1.5 h-4 w-4 bg-marigold"></span>
            <span className="relative flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/25 bg-ink font-display text-xl font-semibold text-bone sm:h-12 sm:w-12">
              L
            </span>
          </span>
          <span className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-display-lg lg:text-display-xl">
            LIVETEACH<span className="grad-text">CREATE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-y-12 py-12 md:grid-cols-3 md:divide-x md:divide-white/10">

          {/* Column 1: Company Profile & MSME Badge */}
          <Reveal delay={0} className="space-y-6 md:pr-10">
            <p className="max-w-sm text-sm leading-relaxed text-bone/60">
              Liveteachcreate is one of the top e-commerce service providers with 6+ years of experience. We assist companies in growing their businesses online through professional seller management for Amazon, Flipkart, Meesho, Blinkit, Zepto, Jiomart, Nykaa, and Myntra.
            </p>

            {/* Official MSME Registered Badge */}
            <div className="inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/5 p-3">
              <div className="shrink-0 rounded-[3px] bg-cream px-2 py-1.5">
                <img
                  src="/msme-logo.png"
                  alt="MSME Registered Enterprise - Micro, Small & Medium Enterprises"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-marigold">Govt. of India Registered</span>
                <span className="mt-0.5 block text-sm font-semibold text-bone">MSME Enterprise</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook" className="pop-hover group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone/70 transition-all duration-300 hover:border-marigold hover:bg-marigold hover:text-ink">
                <i className="fa-brands fa-facebook text-sm transition-transform duration-300 group-hover:rotate-12" aria-hidden="true"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Twitter" className="pop-hover group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone/70 transition-all duration-300 hover:border-violet hover:bg-violet hover:text-ink">
                <i className="fa-brands fa-twitter text-sm transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="pop-hover group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone/70 transition-all duration-300 hover:border-pine hover:bg-pine hover:text-ink">
                <i className="fa-brands fa-instagram text-sm transition-transform duration-300 group-hover:rotate-12" aria-hidden="true"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="pop-hover group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone/70 transition-all duration-300 hover:border-rani hover:bg-rani hover:text-ink">
                <i className="fa-brands fa-linkedin text-sm transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true"></i>
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="Pinterest" className="pop-hover group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-bone/70 transition-all duration-300 hover:border-royal hover:bg-royal hover:text-ink">
                <i className="fa-brands fa-pinterest text-sm transition-transform duration-300 group-hover:rotate-12" aria-hidden="true"></i>
              </a>
            </div>
          </Reveal>

          {/* Column 2: E-Commerce Services & Quick Links */}
          <Reveal delay={100} className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:pl-10">
            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-bone-mute">
                E-Commerce Services
              </h3>
              <span aria-hidden="true" className="mt-3 block h-px w-8 bg-marigold"></span>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li><Link to="/services/amazon-seller-account-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Amazon Account Management</Link></li>
                <li><Link to="/services/flipkart-account-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Flipkart Account Management</Link></li>
                <li><Link to="/services/blinkit-seller-account-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Blinkit Account Management</Link></li>
                <li><Link to="/services/meesho-account-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Meesho Account Management</Link></li>
                <li><Link to="/services/shopify-store-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Shopify Store Management</Link></li>
                <li><Link to="/services/myntra-account-management-services" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Myntra Account Management</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-bone-mute">
                Quick Links
              </h3>
              <span aria-hidden="true" className="mt-3 block h-px w-8 bg-violet"></span>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li><Link to="/about-us" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">About Us</Link></li>
                <li><Link to="/portfolio" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Portfolio</Link></li>
                <li><Link to="/blogs" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Blog</Link></li>
                <li><Link to="/careers" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Career</Link></li>
                {quickTools.map((tool) => (
                  <li key={tool.to}>
                    <Link to={tool.to} className="link-underline group flex items-center gap-2 text-bone/60 hover:text-bone [&::after]:h-0.5">
                      <i className={`${tool.icon} text-[10px] text-marigold`} aria-hidden="true"></i>
                      <span>{tool.label}</span>
                    </Link>
                  </li>
                ))}
                <li><Link to="/contact-us" className="link-underline text-bone/60 hover:text-bone [&::after]:h-0.5">Contact Us</Link></li>
              </ul>
            </div>
          </Reveal>

          {/* Column 3: Contact + Newsletter */}
          <Reveal delay={200} className="space-y-6 md:pl-10">
            <div>
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-bone-mute">
                Contact Us
              </h3>
              <span aria-hidden="true" className="mt-3 block h-px w-8 bg-royal"></span>
              <div className="mt-5 space-y-3 text-sm text-bone/60">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-mobile-screen text-marigold" aria-hidden="true"></i>
                  <span>
                    Direct:{' '}
                    <a href="tel:+919109266248" className="link-underline font-semibold text-bone/70 hover:text-bone [&::after]:h-0.5">+91 9109266248</a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-marigold" aria-hidden="true"></i>
                  <a href="mailto:rohankumar19980211@gmail.com" className="link-underline break-all text-bone/60 hover:text-bone [&::after]:h-0.5">rohankumar19980211@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-bone-mute">
                Growth Notes
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-bone/60">
                Monthly tactics for marketplace sellers. No spam.
              </p>
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="field flex-1 py-2.5 text-sm"
                />
                <button type="submit" className="btn btn-accent btn-sweep shrink-0 px-5 py-2.5">
                  Subscribe
                  <i className="fas fa-arrow-right btn-arrow"></i>
                </button>
              </form>
              {subscribed && (
                <p className="mt-3 font-mono text-[11px] tracking-wide text-marigold">
                  You are on the list. Watch your inbox.
                </p>
              )}
            </div>
          </Reveal>

        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[11px] tracking-wide text-bone-faint md:flex-row">
          <p>© 2020-2026 Liveteachcreate. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/disclaimer" className="link-underline text-bone-faint hover:text-bone [&::after]:h-0.5">Disclaimer</Link>
            <Link to="/terms-and-conditions" className="link-underline text-bone-faint hover:text-bone [&::after]:h-0.5">Terms &amp; Conditions</Link>
            <Link to="/privacy-policy" className="link-underline text-bone-faint hover:text-bone [&::after]:h-0.5">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink text-bone shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold hover:bg-marigold hover:text-ink"
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-base" aria-hidden="true"></i>
        </button>
      )}
    </footer>
  );
}
