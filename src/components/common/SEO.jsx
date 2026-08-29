import { useEffect } from 'react';

export default function SEO({ title, description, canonicalUrl, schemaData }) {
  useEffect(() => {
    // 1. Dynamic Page Title
    const fullTitle = title ? `${title} | Liveteachcreate` : "E-Commerce Platform Service Providers | Liveteachcreate";
    document.title = fullTitle;
    
    // 2. Dynamic Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = description || "Liveteachcreate offers complete seller account management for Myntra, Amazon, Flipkart, Shopify, & Blinkit, including listings, inventory & PPC ads.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    }

    // 3. OpenGraph Tags
    const setMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', descContent);
    setMetaTag('og:type', 'website');
    setMetaTag('og:site_name', 'Liveteachcreate');
    setMetaTag('og:url', canonicalUrl || window.location.href);

    // 4. Twitter Card Tags
    const setTwitterTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', fullTitle);
    setTwitterTag('twitter:description', descContent);

    // 5. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl || window.location.href);

    // 6. JSON-LD Schema Markup
    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const defaultOrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Liveteachcreate",
      "url": "https://liveteachcreate.com",
      "logo": "https://liveteachcreate.com/msme-logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9109266248",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://facebook.com",
        "https://instagram.com",
        "https://linkedin.com"
      ]
    };

    schemaScript.text = JSON.stringify(schemaData || defaultOrganizationSchema);

  }, [title, description, canonicalUrl, schemaData]);

  return null;
}
