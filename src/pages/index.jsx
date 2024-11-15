import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import CategorySection from "@/components/banner/Category-Section";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import ProductArea from "@/components/products/electronics/product-area";
import ProductGadgetArea from "@/components/products/electronics/product-gadget-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import BlogArea from "@/components/blog/electronic/blog-area";
import InstagramArea from "@/components/instagram/instagram-area";
import Footer from "@/layout/footers/footer";

export default function Home() {
  // Comprehensive SEO Metadata Configuration
  const seoConfig = {
    pageTitle: "My Sweet Wishes - Unique Personalized Gifts",
    category: "home",
    description: "Discover a magical world of unique gifts at My Sweet Wishes. From adorable teddies to personalized cards and surprise boxes, find the perfect gift for every occasion.",
    keywords: [
      "gift shop",
      "unique gifts",
      "personalized presents",
      "surprise gifts",
      "online gift store",
      "teddy bears",
      "greeting cards",
      "wall paintings",
      "Diwali gifts"
    ],
    image: "/og-home-image.jpg",
    canonicalUrl: "/",
    
    // Additional SEO Structured Data
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "My Sweet Wishes",
      "url": "https://mysweetwishes.com",
      "description": "Your one-stop destination for unique and personalized gifts",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://mysweetwishes.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  };

  return (
    <Wrapper>
      {/* SEO Component with Comprehensive Metadata */}
      <SEO
        pageTitle={seoConfig.pageTitle}
        category={seoConfig.category}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        image={seoConfig.image}
        canonicalUrl={seoConfig.canonicalUrl}
        structuredData={seoConfig.structuredData}
      />

      {/* Page Layout Components */}
      <Header />

      
      <CategorySection />
      <HomeHeroSlider />
      
      {/* Product Areas with Dynamic Categories */}
      <ProductArea 
        categories="Trending"
      />
      
      <ProductArea 
        categories="Featured"
      />
    
      <ProductBanner />
      <BlogArea />
      <InstagramArea />
      <Footer />
    </Wrapper>
  );
}


