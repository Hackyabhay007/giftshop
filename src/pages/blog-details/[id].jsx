import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import BlogDetailsArea from "@/components/blog-details/blog-details-area";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi";
import ErrorMsg from "@/components/common/error-msg";

const BlogDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currPage, setCurrPage] = useState(1);
  const countOfPage = 4;

  // Fetch blog data
  const {
    data: blogData = {},
    isLoading,
    isError,
  } = useFetchBlogsQuery(currPage);

  // Handle loading state
  if (isLoading) {
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mt-20 mb-20">Loading blog details...</div>
        </div>
        <Footer primary_style={true} />
      </Wrapper>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <ErrorMsg msg="Error fetching blog details" />
        <Footer primary_style={true} />
      </Wrapper>
    );
  }

  const { data: blogs = [] } = blogData;

  // Find the specific blog item using the ID
  const blogItem = blogs.find((blog) => blog.id === Number(id));

  // Check if the blog item exists
  if (!blogItem) {
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <ErrorMsg msg="Blog not found" />
        <Footer primary_style={true} />
      </Wrapper>
    );
  }

  // SEO Configuration
  const seoConfig = {
    pageTitle: `${blogItem.title} | My Sweet Wishes Blog`,
    description: blogItem.excerpt || blogItem.content.slice(0, 160),
    keywords: [
      "blog",
      "gift ideas",
      ...generateKeywordsFromContent(blogItem.content)
    ],
    canonicalUrl: `/blog/${blogItem.id}`,
    image: blogItem.image || "/default-blog-image.jpg",
    structured_data: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogItem.title,
      "author": {
        "@type": "Person",
        "name": blogItem.author || "My Sweet Wishes Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "My Sweet Wishes",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mysweetwishes.com/logo.png"
        }
      },
      "datePublished": blogItem.createdAt,
      "dateModified": blogItem.updatedAt,
      "image": blogItem.image || "/default-blog-image.jpg",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://mysweetwishes.com/blog/${blogItem.id}`
      },
      "description": blogItem.excerpt || blogItem.content.slice(0, 160)
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
        <meta property="og:type" content="article" />
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

      {/* Original Page Components */}
      <HeaderTwo style_2={true} />
      <BlogDetailsArea blog={blogItem} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default BlogDetailsPage;

// Utility function to generate keywords from content
function generateKeywordsFromContent(content, maxKeywords = 5) {
  // Simple keyword extraction (can be replaced with more advanced NLP techniques)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordFrequency = {};
  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}




