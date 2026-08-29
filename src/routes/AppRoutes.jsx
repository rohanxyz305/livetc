import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import PortfolioPage from '../pages/PortfolioPage';
import BlogPage from '../pages/BlogPage';
import CareerPage from '../pages/CareerPage';
import ContactPage from '../pages/ContactPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import CityServicePage from '../pages/CityServicePage';
import LegalPage from '../pages/LegalPage';
import EmailMarketingPage from '../pages/EmailMarketingPage';
import SeologicPage from '../pages/SeologicPage';
import ProductListingGeneratorPage from '../pages/ProductListingGeneratorPage';

export default function AppRoutes({ onOpenContactPopup }) {
  return (
    <Routes>
      {/* Core Pages */}
      <Route path="/" element={<HomePage onOpenContactPopup={onOpenContactPopup} />} />
      <Route path="/index.php" element={<Navigate to="/" replace />} />
      <Route path="/about-us" element={<AboutUsPage onOpenContactPopup={onOpenContactPopup} />} />
      <Route path="/about-us.php" element={<Navigate to="/about-us" replace />} />
      <Route path="/portfolio" element={<PortfolioPage onOpenContactPopup={onOpenContactPopup} />} />
      <Route path="/portfolio.php" element={<Navigate to="/portfolio" replace />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blogs.php" element={<Navigate to="/blogs" replace />} />
      <Route path="/careers" element={<CareerPage />} />
      <Route path="/career.php" element={<Navigate to="/careers" replace />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/contact-us.php" element={<Navigate to="/contact-us" replace />} />

      {/* Free Email Marketing Studio */}
      <Route path="/email-marketing" element={<EmailMarketingPage />} />

      {/* Free Seologic SEO Keyword Research Tool */}
      <Route path="/seo-keyword-tool" element={<SeologicPage />} />
      <Route path="/seo-keyword-tool.php" element={<Navigate to="/seo-keyword-tool" replace />} />
      <Route path="/keyword-research-tool" element={<Navigate to="/seo-keyword-tool" replace />} />

      {/* AI E-Commerce Product Listing Generator */}
      <Route path="/ecommerce-product-listing-tool" element={<ProductListingGeneratorPage />} />
      <Route path="/product-listing-tool" element={<Navigate to="/ecommerce-product-listing-tool" replace />} />
      
      {/* Course Route Redirect */}
      <Route path="/ecommerce-course-in-jaipur" element={<Navigate to="/contact-us" replace />} />
      <Route path="/ecommerce-course-in-jaipur.php" element={<Navigate to="/contact-us" replace />} />

      {/* Case Studies Redirect */}
      <Route path="/case-studies/*" element={<Navigate to="/portfolio" replace />} />

      {/* Legal Pages */}
      <Route path="/disclaimer" element={<LegalPage />} />
      <Route path="/disclaimer.php" element={<Navigate to="/disclaimer" replace />} />
      <Route path="/terms-and-conditions" element={<LegalPage />} />
      <Route path="/terms-and-conditions.php" element={<Navigate to="/terms-and-conditions" replace />} />
      <Route path="/privacy-policy" element={<LegalPage />} />
      <Route path="/privacy-policy.php" element={<Navigate to="/privacy-policy" replace />} />

      {/* Reusable Dynamic Service Detail Routes */}
      <Route path="/services/:slug" element={<ServiceDetailPage onOpenContactPopup={onOpenContactPopup} />} />

      {/* Legacy Direct PHP URLs mapping to Service Detail */}
      <Route path="/:slug.php" element={<ServiceDetailPage onOpenContactPopup={onOpenContactPopup} />} />

      {/* Reusable Dynamic Location / City Routes */}
      <Route path="/locations/:slug" element={<CityServicePage onOpenContactPopup={onOpenContactPopup} />} />

      {/* Fallback Wildcard Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
