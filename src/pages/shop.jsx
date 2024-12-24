import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
} from "@/redux/features/productApi";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import ErrorMsg from "@/components/common/error-msg";

const ShopPage = ({ query }) => {
  const [categoryId, setCategoryId] = useState(query?.category || null);
  const [currPage, setCurrPage] = useState(1);
  const shopAreaRef = useRef(null);
  const router = useRouter();

  const {
    data: allProducts,
    isError: isProductsError,
    isLoading: isProductsLoading,
  } = useGetAllProductsQuery();

  const {
    data: categoryProducts = [],
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetProductTypeQuery(categoryId, { skip: !categoryId });

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    let reset = localStorage.getItem("defaultFilterval");

    if (reset === "true") {
      setSelectValue("Default Sorting");
    }
  });
  // Reset category filter
  const resetCategory = () => {
    setCategoryId(null);
    setCurrPage(1);
  };

  useEffect(() => {
    if (!isProductsLoading && allProducts?.data) {
      const maxPrice = Math.max(...allProducts.data.map((p) => p.price), 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isProductsLoading, allProducts]);

  useEffect(() => {
    if (query?.category) {
      setCategoryId(query.category);
    }
  }, [query?.category]);

  // Scroll to shop area when the component mounts or when the category changes
  const scrollToShopArea = () => {
    if (shopAreaRef.current) {
      shopAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToShopArea();
  }, [categoryId]);

  let product_items = categoryId ? categoryProducts : allProducts?.data || [];

  if (isCategoryLoading || isProductsLoading) {
    return <ShopLoader loading={isCategoryLoading || isProductsLoading} />;
  } else if (isCategoryError || isProductsError) {
    return <ErrorMsg msg="Error loading products." />;
  } else if (product_items.length === 0) {
    return <ErrorMsg msg="No Products found!" />;
  }

  // Sorting logic
  const sortingMethods = {
    "Low to High": () => [...product_items].sort((a, b) => a.price - b.price),
    "High to Low": () => [...product_items].sort((a, b) => b.price - a.price),
    "New Added": () =>
      [...product_items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    "On Sale": () => product_items.filter((p) => p.discount > 0),
  };

  if (selectValue && sortingMethods.hasOwnProperty(selectValue)) {
    product_items = sortingMethods[selectValue]();
  }

  // Price filter
  product_items = product_items.filter(
    (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
  );

  const categoryName = router.query.name || "All Products";

  // SEO Configuration
  const seoConfig = {
    pageTitle: `Shop ${categoryName} | My Sweet Wishes`,
    description: `Explore our extensive collection of ${categoryName}. Find the perfect gift with our carefully curated selection of high-quality products.`,
    keywords: [
      "online shopping",
      `${categoryName} gifts`,
      "personalized presents",
      "unique gift ideas",
      "gift store",
    ],
    canonicalUrl: `/shop/${categoryId || ""}`,
    structured_data: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Shop ${categoryName} | My Sweet Wishes`,
      description: `Explore our extensive collection of ${categoryName}. Find the perfect gift with our carefully curated selection of high-quality products.`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: product_items.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.image,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock ? "InStock" : "OutOfStock",
            },
          },
        })),
      },
    },
  };

  return (
    <Wrapper>
      {/* Advanced SEO Metadata */}
      <Head>
        {/* Primary Meta Tags */}
        <title>{seoConfig.pageTitle}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords.join(", ")} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={seoConfig.pageTitle} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:type" content="product.group" />
        <meta
          property="og:url"
          content={`https://mysweetwishes.com${seoConfig.canonicalUrl}`}
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.pageTitle} />
        <meta name="twitter:description" content={seoConfig.description} />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://mysweetwishes.com${seoConfig.canonicalUrl}`}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structured_data),
          }}
        />
      </Head>

      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title={categoryName} subtitle="All Products" />

      <div ref={shopAreaRef}>
        <ShopArea
          all_products={allProducts?.data}
          products={product_items}
          otherProps={{
            priceFilterValues: { priceValue, handleChanges: setPriceValue },
            selectHandleFilter: (e) => {
              setCurrPage(1);
              setSelectValue(e.value);
            },
            currPage,
            setCurrPage,
          }}
          resetCategory={resetCategory}
        />
      </div>

      <ShopFilterOffCanvas
        all_products={allProducts?.data}
        otherProps={{
          priceFilterValues: { priceValue, handleChanges: setPriceValue },
          selectHandleFilter: (e) => {
            setCurrPage(1);
            setSelectValue(e.value);
          },
          currPage,
          setCurrPage,
        }}
      />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: { query },
  };
};
