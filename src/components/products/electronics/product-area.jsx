import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import Link from "next/link";
import { useIsMobile } from "@/utils/isMobileUtil";

const ProductArea = ({ categories }) => {
  const isMobile = useIsMobile(); // Check if the device is mobile
  const [activeTab, setActiveTab] = useState("Trending");
  const [sortOption, setSortOption] = useState("none");
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useGetProductTypeQuery(activeTab);

  useEffect(() => {
    refetch(); // Refetch products when activeTab changes
  }, [activeTab, refetch]);

  // Handle tab switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error fetching products." />;
  } else if (!products?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    // Sort and filter products
    const filteredProducts = products.filter((product) =>
      Array.isArray(product.categories)
    );

    if (sortOption === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filteredProducts.length === 0) {
      content = <ErrorMsg msg="No products found in this category!" />;
    } else {
      // Limit to 4 products on mobile
      const displayedProducts = isMobile
        ? filteredProducts.slice(0, 4)
        : filteredProducts;
      content = displayedProducts.map((prd) => (
        <div
          key={prd.id}
          className={`${
            isMobile ? "col-6" : "col-xl-3 col-lg-3 col-md-4 col-sm-6"
          }`}
        >
          <div className="product-card">
            <ProductItem
              product={prd}
              style={{
                height: isMobile ? "auto" : "100%",
                fontSize: isMobile ? "14px" : "16px",
              }}
            />
          </div>
        </div>
      ));
    }
  }

  return (
    <section className="tp-product-area mt-40 mb-40 pb-55">
      <div className="premium-background">
        <div className="container">
          <div className="header-container">
            <h2 className="premium-title">Featured Products</h2>
            <div className="premium-sort">
              <select
                className="sort-select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="none">Sort by: Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="premium-tabs">
            <button
              className={`premium-tab ${activeTab === "Trending" ? "active" : ""}`}
              onClick={() => handleTabSwitch("Trending")}
            >
              Trending
              <span className="tab-underline"></span>
            </button>
            <button
              className={`premium-tab ${activeTab === "Featured" ? "active" : ""}`}
              onClick={() => handleTabSwitch("Featured")}
            >
              Featured
              <span className="tab-underline"></span>
            </button>
          </div>

          <div className="row product-grid">
            {content}
          </div>

          <div className="text-center mt-4">
            <Link href="/shop">
              <button className="premium-button">
                See More Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .premium-background {
          background: linear-gradient(to right, #ffffff, #f8f8f8);
          background-image: radial-gradient(#99010015 1px, transparent 1px);
          background-size: 20px 20px;
          padding: 60px 0;
        }

        .product-grid {
          margin: 0 -15px;
        }

        .product-grid > div {
          margin-bottom: 30px;
          padding: 0 15px;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 0 15px;
        }

        .premium-title {
          font-family: 'Tangerine', cursive;
          font-size: 65px;
          color: #990100;
          margin: 0;
          padding: 0;
        }

        .premium-tabs {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
        }

        .premium-tab {
          font-size: 24px;
          padding: 12px 30px;
          background: transparent;
          border: none;
          color: #666;
          position: relative;
          transition: all 0.3s ease;
        }

        .premium-tab.active {
          color: #990100;
        }

        .tab-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #990100;
          transition: width 0.3s ease;
        }

        .premium-tab.active .tab-underline {
          width: 100%;
        }

        .premium-grid {
          display: grid;
          gap: 30px;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          padding: 20px 0;
        }

        .sort-select {
          width: 200px;
          padding: 8px 15px;
          border: 1px dashed #990100;
          border-radius: 4px;
          background: white;
          color: #990100;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .sort-select:hover {
          box-shadow: 0 0 10px rgba(153, 1, 0, 0.1);
        }

        .premium-button {
          background: transparent;
          color: #990100;
          border: 2px dashed #990100;
          padding: 12px 30px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .premium-button:hover {
          background: #990100;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(153, 1, 0, 0.2);
        }

        @media (max-width: 768px) {
          .premium-background {
            padding: 30px 0;
          }

          .product-grid {
            margin: 0 -10px;
          }

          .product-grid > div {
            padding: 0 10px;
            margin-bottom: 20px;
          }

          .header-container {
            flex-direction: column;
            gap: 15px;
          }

          .premium-title {
            font-size: 45px;
          }

          .premium-tab {
            font-size: 18px;
            padding: 8px 15px;
          }

          .premium-grid {
            gap: 15px;
          }

          .sort-select {
            width: 150px;
            font-size: 14px;
          }
        }

        @media (max-width: 576px) {
          .product-grid > div {
            padding: 0 8px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductArea;
