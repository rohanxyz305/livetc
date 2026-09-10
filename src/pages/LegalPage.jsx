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
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">1. Introduction & Scope</h3>
          <p className="text-gray-300 mb-2">
            Liveteachcreate ("we," "our," or "us") is a premier Digital Marketing, Search Engine Optimization (SEO), and E-Commerce Marketplace Account Management and web development company based in dhanbad jharkhan, India. We operate the website <a href="https://liveteachcreate.com" className="text-[#FEE715] underline">https://liveteachcreate.com</a> (the "Site") and provide professional services including marketplace seller account management (Amazon, Flipkart, Meesho, Myntra, Blinkit, Swiggy Instamart, Zepto), PPC advertisement management, local SEO, listing cataloging, and digital growth consulting.
          </p>
          <p className="text-gray-400">
            This Privacy Policy explains how we collect, use, disclose, and protect your personal and business information when you visit our Site, request an account audit, submit an inquiry form, or engage our services.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">2. Information We Collect</h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-white mb-1">A. Information You Provide Voluntarily</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li><strong className="text-white">Contact Identification Data:</strong> Name, email address (<a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a>), phone number (<a href="tel:+918904979375" className="text-[#FEE715]">+91 8904979375</a>), city/location, and brand name submitted via contact forms, strategy calls, or popup forms.</li>
                <li><strong className="text-white">Business Details:</strong> GST number, business address, billing details, and marketplace category preferences.</li>
                <li><strong className="text-white">Inquiry Communications:</strong> Communications, project scope details, and messages sent via email, phone, or WhatsApp.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">B. Technical & Usage Data Automatically Collected</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li><strong className="text-white">Device & Log Data:</strong> IP address, browser type and version, operating system, referring URL, time spent on pages, and click paths.</li>
                <li><strong className="text-white">Interactive Tool Inputs:</strong> Search terms, non-sensitive keyword queries, or listing inputs processed through our free web tools (e.g., SEO Keyword Tool, AI Product Listing Generator).</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">C. Client Marketplace & Advertising Data (Service Clients Only)</h4>
              <p className="text-gray-400">
                For client partners who engage our agency services, we receive authorized read-only or manager access to seller central dashboards (Amazon, Flipkart, Blinkit, Meesho) or ad platforms (Google Ads, Meta Ads Manager, Google Search Console, Google Analytics) strictly for campaign audits, reporting, and management.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">3. How We Use Your Information</h3>
          <p className="mb-2 text-gray-300">We use your information strictly for legitimate business purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li><strong className="text-white">Delivering Services:</strong> Managing marketplace seller central accounts, conducting SEO keyword research, managing ad campaigns, optimizing product listings, and boosting organic rankings.</li>
            <li><strong className="text-white">Audit & Strategy Consultations:</strong> Generating complimentary marketplace audits, SEO analysis reports, and scheduling strategy calls requested by you.</li>
            <li><strong className="text-white">Client Support & Reporting:</strong> Communicating project status, sending performance reports, and providing customer support via Phone/WhatsApp (<a href="https://wa.me/918904979375" target="_blank" rel="noreferrer" className="text-emerald-400">+91 8904979375</a>).</li>
            <li><strong className="text-white">Marketing & Service Updates:</strong> Sending periodic digital marketing tips, industry updates, and service offers (you may opt out at any time).</li>
            <li><strong className="text-white">Security & Website Optimization:</strong> Maintaining site security, preventing fraudulent activity, and analyzing user experience.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">4. Cookies & Tracking Technologies</h3>
          <p className="text-gray-300">
            We use essential cookies and web analytics tools (such as Google Analytics and Meta Pixel) to evaluate Site traffic, optimize user experience, and deliver relevant digital search advertisements. You can manage or disable cookie preferences through your web browser settings at any time.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">5. Data Protection & Information Sharing</h3>
          <p className="mb-2 text-gray-300">We do not sell, rent, or trade your personal or business information. We share data only under strict conditions:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li><strong className="text-white">Third-Party Infrastructure:</strong> Trusted hosting providers (cPanel hosting servers) and email delivery services (SMTP).</li>
            <li><strong className="text-white">Legal Compliance:</strong> When required by law or government authorities under Indian Information Technology laws (IT Act, 2000).</li>
            <li><strong className="text-white">Security:</strong> All data transmitted between your browser and our website is protected using 256-bit SSL Encryption.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">6. Data Retention & Your Rights</h3>
          <p className="mb-2 text-gray-300">You have full control over your personal information:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li><strong className="text-white">Right to Access & Correction:</strong> You may request a copy or ask us to update your personal data.</li>
            <li><strong className="text-white">Right to Deletion (Right to be Forgotten):</strong> You may request the removal of your contact details from our records.</li>
            <li><strong className="text-white">Opt-Out of Marketing:</strong> Unsubscribe from marketing communications at any time by emailing <a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a>.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#FEE715] mb-2 font-display">7. Third-Party Links</h3>
          <p className="text-gray-300">
            Our Site contains links to external marketplace portals and social media networks (Amazon, Flipkart, Blinkit, Google, Meta, Meesho). We have no control over third-party privacy practices and recommend reviewing their privacy policies.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-800 space-y-2">
          <h3 className="text-sm font-bold text-[#FEE715] font-display">8. Contact Us</h3>
          <p className="text-gray-300">
            For any privacy questions, data requests, or legal notices, contact our agency team:
          </p>
          <div className="mt-2 space-y-1.5 text-gray-300 bg-gray-950 p-4 rounded-2xl border border-gray-800">
            <p><strong className="text-white">Entity:</strong> Liveteachcreate</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:connectliveteachcreate@gmail.com" className="text-[#FEE715]">connectliveteachcreate@gmail.com</a></p>
            <p><strong className="text-white">Phone / WhatsApp:</strong> <a href="tel:+918904979375" className="text-[#FEE715]">+91 8904979375</a> / <a href="https://wa.me/918904979375" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold">Chat on WhatsApp</a></p>
            <p><strong className="text-white">Head Office Address:</strong> C-5, 1st Floor, 80 Feet Road, Kiran Path, Shanthi Nagar, Mansarovar, Jaipur, Rajasthan 302019, India</p>
            <p><strong className="text-white">Website:</strong> <a href="https://liveteachcreate.com" className="text-[#FEE715] underline">https://liveteachcreate.com</a></p>
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
      <SEO title={title} description={`${title} for Liveteachcreate Digital Marketing & Web Development Company.`} />
      
      <div className="bg-gradient-to-b from-gray-900 to-[#101820] py-12 text-white border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white font-display">{title}</h1>
          <p className="text-xs text-gray-400">Liveteachcreate Digital Marketing & Web Development Company Legal Terms</p>
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
