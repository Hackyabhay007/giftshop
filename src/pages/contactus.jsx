import React from "react";
import Head from 'next/head';
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";

const ContactPage = () => {
  // Comprehensive SEO Configuration
  const seoConfig = {
    pageTitle: "Contact My Sweet Wishes | Get in Touch",
    description: "Reach out to My Sweet Wishes. We're here to help you with any questions, support, or gift inquiries. Contact us through phone, email, or visit our location.",
    keywords: [
      "contact us",
      "customer support",
      "gift consultation",
      "customer service",
      "contact information"
    ],
    canonicalUrl: "/contactus",
    image: "/contact-og-image.jpg",
    structured_data: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "My Sweet Wishes Contact",
      "description": "Contact information for My Sweet Wishes gift store",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9996061015",
        "email": "ankit@mysweetwishes.com",
        "contactType": "Customer Support",
        "availableLanguage": ["English", "Hindi"]
      },
      "location": {
        "@type": "PostalAddress",
        "streetAddress": "83, Mahaveer Complex",
        "addressLocality": "Kurukshetra",
        "addressRegion": "Haryana",
        "postalCode": "136118",
        "addressCountry": "IN"
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
      <ContactArea />
      <ContactMap />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ContactPage;

// Optional: Static Props Generation for SEO and Performance
export async function getStaticProps() {
  try {
    // Fetch additional contact page metadata
    const contactPageContent = await fetchContactPageContent(); // Implement this function

    return {
      props: {
        contactContent: contactPageContent,
        lastUpdated: new Date().toISOString()
      },
      // Regenerate page every 24 hours
      revalidate: 86400
    };
  } catch (error) {
    console.error("Failed to fetch contact page content", error);
    return {
      props: {
        error: true
      },
      // Faster revalidation on error
      revalidate: 60
    };
  }
}

// Sitemap Generation Function
export async function generateSitemap() {
  return {
    loc: '/contactus',
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: 'monthly'
  };
}

// Utility function (to be implemented)
async function fetchContactPageContent() {
  return {
    businessHours: "Monday-Saturday: 10 AM - 7 PM",
    additionalContacts: [
      {
        type: "Customer Support",
        phone: "+91-9996061015",
        email: "ankit@mysweetwishes.com"
      }
    ]
  };
}
