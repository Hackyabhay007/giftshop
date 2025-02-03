import React from "react";
import Head from 'next/head';
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import BlogBreadcrumb from "@/components/breadcrumb/blog-breadcrumb";
import BlogPostboxArea from "@/components/blog/blog-postox/blog-postbox-area";

const BlogPostBoxPage = () => {
  // Comprehensive SEO Configuration
  const seoConfig = {
    pageTitle: "Blog | My Sweet Wishes - Inspiring Gift Ideas & Stories",
    description: "Discover heartwarming stories, gift inspiration, and creative ideas at My Sweet Wishes blog. Your ultimate guide to meaningful gifting and celebration.",
    keywords: [
      "gift blog",
      "gifting ideas",
      "celebration stories",
      "thoughtful presents",
      "gift inspiration",
      "unique gift trends",
      "personal gifting guide"
    ],
    canonicalUrl: "/blog",
    structured_data: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "My Sweet Wishes Blog",
      "description": "Inspiring gift ideas, stories, and creative present solutions",
      "publisher": {
        "@type": "Organization",
        "name": "My Sweet Wishes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mysweetwishes.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://mysweetwishes.com/blog"
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
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`https://mysweetwishes.com${seoConfig.canonicalUrl}`} />
        <meta property="og:site_name" content="My Sweet Wishes" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.pageTitle} />
        <meta name="twitter:description" content={seoConfig.description} />
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

      {/* Original Page Components */}
      <HeaderTwo style_2={true} />
      <BlogBreadcrumb />
      <BlogPostboxArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default BlogPostBoxPage;

