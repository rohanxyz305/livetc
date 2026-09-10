import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function LegalPage() {
  const location = useLocation();
  const path = location.pathname;

  let title = "Legal Information";
  let content = null;

  if (path.includes('privacy-policy')) {
    title = "Privacy Policy";
    content = (
      <div className="space-y-6 text-xs text-gray-300 leading-relaxed">
        <div className="border-b border-gray-800 pb-3">
          <p className="text-[#FEE715] font-bold text-xs">Last Updated: September 10, 2026</p>
          <p className="text-gray-400 mt-1">
            Liveteachcreate ("we," "our," or "us") is a premier Digital Marketing, Search Engine Optimization (SEO), and E-Commerce Marketplace Account Management Agency based in Jaipur, Rajasthan, India. We operate the website <a href="https://liveteachcreate.com" className="text-[#FEE715] underline">https://liveteachcreate.com</a> and deliver digital marketing services, marketplace account handling (Amazon, Flipkart, Meesho, Blinkit, Zepto), PPC ad management, and SEO consulting.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">1. Information We Collect</h3>
          <p className="mb-2">We collect personal and business information necessary to provide marketing audits, consultations, and account management services:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li><strong className="text-white">Contact & Identification Data:</strong> Name, email address (<a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a>), phone number (<a href="tel:+918904979375" className="text-[#FEE715]">+91 8904979375</a>), city, and business name provided via lead forms, contact popups, or strategy calls.</li>
            <li><strong className="text-white">Technical & Usage Data:</strong> IP address, browser type, operating system, referring URLs, and interactive tool queries (e.g. SEO Keyword Tool).</li>
            <li><strong className="text-white">Client Marketplace Data:</strong> Read-only or authorized access to seller portals (Amazon, Flipkart, Blinkit) and ad accounts (Google Ads, Meta Ads) provided explicitly by client partners for campaign optimization.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">2. How We Use Your Information</h3>
          <p className="mb-2">Your information is used strictly for legitimate business purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>Delivering marketplace management, SEO keyword research, PPC optimization, and catalog listing services.</li>
            <li>Generating complimentary seller account audits and scheduling strategy calls.</li>
            <li>Communicating project updates, monthly performance reports, and customer support via Phone/WhatsApp (<a href="https://wa.me/918904979375" target="_blank" rel="noreferrer" className="text-emerald-400">+91 8904979375</a>).</li>
            <li>Ensuring website security, preventing fraud, and improving site performance.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">3. Cookies & Tracking Technologies</h3>
          <p>
            We use essential cookies and analytics tools (such as Google Analytics and Meta Pixel) to evaluate Site traffic, optimize user experience, and deliver relevant search ads. You can manage or disable cookie preferences through your web browser settings at any time.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">4. Information Sharing & Data Protection</h3>
          <p>
            We <strong className="text-white">do not sell or rent</strong> your personal information. Data is shared only with trusted infrastructure providers (cPanel hosting, SSL secure servers) or when required by legal authorities under Indian Information Technology laws (IT Act, 2000). All client data is encrypted via 256-bit SSL during transmission.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">5. Data Retention & Your Rights</h3>
          <p>
            You have the right to request access, correction, or complete deletion of your personal contact data from our records. To submit a data privacy request or unsubscribe from marketing emails, contact us at <a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a>.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">6. Third-Party Links</h3>
          <p>
            Our website contains links to marketplace portals and social media networks (Amazon, Flipkart, Google, Meta). We are not responsible for the privacy practices or content of third-party platforms.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">7. Contact Information</h3>
          <p className="text-gray-300">
            For privacy inquiries, audit requests, or legal notices, please reach out to our team:
          </p>
          <div className="mt-2 space-y-1 text-gray-400">
            <p><strong className="text-white">Entity:</strong> Liveteachcreate</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a></p>
            <p><strong className="text-white">Phone / WhatsApp:</strong> <a href="tel:+918904979375" className="text-[#FEE715]">+91 8904979375</a></p>
            <p><strong className="text-white">Head Office Address:</strong> C-5, 1st Floor, 80 Feet Road, Kiran Path, Shanthi Nagar, Mansarovar, Jaipur, Rajasthan 302019, India</p>
          </div>
        </div>
      </div>
    );
  } else if (path.includes('terms-and-conditions')) {
    title = "Terms & Conditions";
    content = (
      <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
        <p>By accessing or using the services of Liveteachcreate, you agree to comply with and be bound by the following terms and conditions.</p>
        <h3 className="text-sm font-bold text-[#FEE715]">Service Terms</h3>
        <p>Liveteachcreate provides e-commerce account management, catalog listing, PPC advertising, and onboarding services. All client accounts remain subject to third-party marketplace terms (Amazon, Flipkart, Blinkit, etc.).</p>
        <h3 className="text-sm font-bold text-[#FEE715]">Intellectual Property</h3>
        <p>All content, branding, logos, and materials created by Liveteachcreate remain the intellectual property of Liveteachcreate unless explicitly transferred.</p>
      </div>
    );
  } else {
    title = "Disclaimer";
    content = (
      <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
        <p>Liveteachcreate is an independent e-commerce service agency based in Jaipur, India. Brand names such as Amazon, Flipkart, Meesho, Myntra, Blinkit, Swiggy Instamart, Zepto, Nykaa, and Tata CLiQ are registered trademarks of their respective owners.</p>
        <p>Liveteachcreate provides service facilitation, PPC ad management, and operational consulting. Sales growth metrics and performance results depend on product demand, pricing, inventory availability, and market dynamics.</p>
      </div>
    );
  }

  return (
    <>
      <SEO title={title} description={`${title} for Liveteachcreate Digital Marketing Agency.`} />
      
      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-12 text-white border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white font-display">{title}</h1>
          <p className="text-xs text-gray-400">Liveteachcreate Digital Marketing Agency Legal Terms</p>
        </div>
      </div>

      <section className="py-12 bg-[#101820] text-white">
        <div className="max-w-3xl mx-auto px-4 bg-gray-900/60 p-8 rounded-3xl border border-gray-800 shadow-lg">
          {content}
        </div>
      </section>
    </>
  );
}
