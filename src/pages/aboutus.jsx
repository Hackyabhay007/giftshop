import React from "react";
import Head from 'next/head';
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import JewelryAbout from "@/components/about/jewelry-about";

const AboutPage = () => {
  // Comprehensive SEO Configuration
  const seoConfig = {
    pageTitle: "About My Sweet Wishes | Our Story, Mission & Passion",
    description: "Discover the heart behind My Sweet Wishes. Learn about our journey, passion for creating unique gifts, and commitment to spreading joy through personalized present experiences.",
    keywords: [
      "about us",
      "gift company story",
      "gift mission",
      "personalized gifts",
      "gift brand philosophy",
      "unique gift creators"
    ],
    canonicalUrl: "/aboutus",
    image: "/about-og-image.jpg",
    structured_data: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "My Sweet Wishes - About Us",
      "description": "Discover the heart behind My Sweet Wishes. Learn about our journey, passion for creating unique gifts, and commitment to spreading joy through personalized present experiences.",
      "founder": {
        "@type": "Person",
        "name": "Ankit Sharma",
        "description": "Passionate creator of meaningful gift experiences"
      },
      "foundingDate": "2020",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mysweetwishes.com/logo.png"
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "My Sweet Wishes",
        "description": "Crafting memorable gift experiences",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "83, Mahaveer Complex",
          "addressLocality": "Kurukshetra",
          "addressRegion": "Haryana",
          "postalCode": "136118",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-7404510125",
          "email": "ankit@mysweetwishes.com",
          "contactType": "Customer Support"
        }
      }
    }
  };

  return (
    <Wrapper>
      {/* Advanced SEO Metadata */}
      <Head>
        {/* Primary Meta Tags */}
        <title>{seoConfig.pageTitle}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords.join(', ')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={seoConfig.pageTitle} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://mysweetwishes.com${seoConfig.canonicalUrl}`} />
        <meta property="og:image" content={`https://mysweetwishes.com${seoConfig.image}`} />
        <meta property="og:site_name" content="My Sweet Wishes" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.pageTitle} />
        <meta name="twitter:description" content={seoConfig.description} />
        <meta name="twitter:image" content={`https://mysweetwishes.com${seoConfig.image}`} />
        <meta name="twitter:site" content="@mysweetwishes" />

        {/* Canonical URL */}
        <link 
          rel="canonical" 
          href={`https://mysweetwishes.com${seoConfig.canonicalUrl}`} 
        />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(seoConfig.structured_data) 
          }}
        />
      </Head>

      {/* Page Components */}
      <HeaderTwo style_2={true} />
      <ContactBreadcrumb />
      <JewelryAbout />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default AboutPage;



// Sitemap Generation Function
export async function generateSitemap() {
  return {
    loc: '/aboutus',
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly'
  };
}
