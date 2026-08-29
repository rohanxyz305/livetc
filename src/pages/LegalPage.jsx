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
      <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
        <p>Liveteachcreate values your privacy. This policy outlines how we handle personal information collected through our website, forms, and services.</p>
        <h3 className="text-sm font-bold text-[#FEE715]">Information We Collect</h3>
        <p>We collect contact information including name, email address, phone number, and city when submitted via lead forms, strategy call requests, or contact popups.</p>
        <h3 className="text-sm font-bold text-[#FEE715]">Use of Information</h3>
        <p>Information collected is strictly utilized to provide seller account audits, marketplace consultations, customer support, and service updates.</p>
        <h3 className="text-sm font-bold text-[#FEE715]">Data Security</h3>
        <p>We implement industry-standard administrative and technical security measures to safeguard user information against unauthorized disclosure.</p>
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
      <SEO title={title} description={`${title} for Liveteachcreate.`} />
      
      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-12 text-white border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white font-display">{title}</h1>
          <p className="text-xs text-gray-400">Liveteachcreate Legal Terms</p>
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
