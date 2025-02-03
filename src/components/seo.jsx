import Head from "next/head";

const SEO = ({ 
  pageTitle, 
  description, 
  keywords,
  category = 'home',
  image = '/default-og-image.jpg',
  canonicalUrl = '/'
}) => {
  // Dynamic SEO Configurations
  const seoConfig = {
    home: {
      title: "My Sweet Wishes - Unique Personalized Gifts",
      description: "Discover magical gifts for every occasion. Teddies, cards, wall paintings, and personalized surprises!",
      keywords: [
        "personalized gifts", 
        "unique presents", 
        "gift shop", 
        "online gifting", 
        "surprise gifts"
      ]
    },
    teddyMaddy: {
      title: "Teddy Maddy - Adorable Soft Toys",
      description: "Cuddly teddy bears that bring joy and warmth. Perfect gifts for all ages and occasions!",
      keywords: [
        "teddy bears", 
        "soft toys", 
        "cuddly gifts", 
        "personalized teddy", 
        "cute stuffed animals"
      ]
    },
    happyCards: {
      title: "Happy Cards - Personalized Greeting Cards",
      description: "Create memories with our unique and heartfelt greeting cards. Perfect for every celebration!",
      keywords: [
        "greeting cards", 
        "personalized cards", 
        "custom cards", 
        "celebration cards", 
        "memorable gifts"
      ]
    },
    wallPaintings: {
      title: "Wall Paintings - Artistic Home Decor",
      description: "Transform your space with our unique and personalized wall art. Artistic expressions that tell your story.",
      keywords: [
        "wall art", 
        "home decor", 
        "personalized paintings", 
        "custom wall decor", 
        "artistic gifts"
      ]
    },
    diwaliGifts: {
      title: "Diwali Gifts - Festive Celebration Presents",
      description: "Illuminate the festival of lights with our exclusive Diwali gift collection. Spread joy and warmth!",
      keywords: [
        "Diwali gifts", 
        "festival presents", 
        "festive collection", 
        "corporate gifts", 
        "celebration packages"
      ]
    },
    personalised: {
      title: "Personalized Gifts - Unique Custom Presents",
      description: "Create one-of-a-kind gifts that reflect your personal touch. Memories made special!",
      keywords: [
        "custom gifts", 
        "personalized presents", 
        "bespoke gifts", 
        "unique gift ideas", 
        "tailored gifts"
      ]
    }
  };

  // Merge default and custom configurations
  const currentConfig = {
    ...seoConfig[category],
    title: pageTitle || seoConfig[category].title,
    description: description || seoConfig[category].description,
    keywords: keywords || seoConfig[category].keywords
  };

  // Structured Data Generator
  const generateStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "GiftShop",
    "name": "My Sweet Wishes",
    "description": currentConfig.description,
    "url": "https://mysweetwishes.com",
    "logo": "https://mysweetwishes.com/logo.png",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mysweetwishes.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{currentConfig.title}</title>
      <meta name="description" content={currentConfig.description} />
      <meta name="keywords" content={currentConfig.keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mysweetwishes.com${canonicalUrl}`} />
      <meta property="og:title" content={currentConfig.title} />
      <meta property="og:description" content={currentConfig.description} />
      <meta 
        property="og:image" 
        content={`https://mysweetwishes.com${image}`} 
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://mysweetwishes.com${canonicalUrl}`} />
      <meta name="twitter:title" content={currentConfig.title} />
      <meta name="twitter:description" content={currentConfig.description} />
      <meta 
        name="twitter:image" 
        content={`https://mysweetwishes.com${image}`} 
      />

      {/* Canonical URL */}
      <link 
        rel="canonical" 
        href={`https://mysweetwishes.com${canonicalUrl}`} 
      />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="83, Mahaveer Complex, Kurukshetra 136118 Haryana" />

    

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(generateStructuredData()) 
        }}
      />

      {/* Additional Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="My Sweet Wishes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FF6B6B" />

      {/* Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO;
