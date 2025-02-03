export function generateProductStructuredData(product) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "brand": "My Sweet Wishes",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": product.price,
        "availability": "https://schema.org/InStock"
      },
      "image": product.images
    }
  }
  