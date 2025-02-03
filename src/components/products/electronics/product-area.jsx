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
          className={`col-xl-3 col-lg-3 col-sm-6 ${isMobile ? "col-6 " : ""}`} // Added gap-4 for mobile
          style={{
            borderRadius: isMobile ? "0px" : "", // Apply radius for mobile only
            boxShadow: isMobile ? "0px 0px 0px rgba(0, 0, 0, 0)" : "", // Apply shadow for mobile only
            height: isMobile ? "auto" : "", // Optional: You can set a fixed height for mobile if needed
            marginBottom: isMobile ? "20px" : "", // Adding margin for mobile
          }}
        >
          <ProductItem
            product={prd}
            style={{
              height: isMobile ? "200px" : "auto", // Set fixed height for product image in mobile
              fontSize: isMobile ? "14px" : "16px", // Reduce font size for mobile
            }}
          />
        </div>
      ));
    }
  }

  return (
    <section className="tp-product-area mt-40 mb-40 pb-55">
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              padding: "0 10px", // Top padding
              paddingTop: "22px",
              paddingBottom: "10px",
              fontSize: "55px",
              fontFamily: "'Tangerine', cursive",
              borderBottom: "2px dotted gray",
              display: "inline-block", // Ensures the border wraps the text
              margin: "1px 20px", // Center the element horizontally
              color:'#990100'
            }}
          >
            Products
          </h2>
        </div>
        {/* Mobile and Desktop Layout */}
        <div className="my-4 text-center">
          <button
            className={`btn ${
              activeTab === "Trending" ? "bg-white active text-black" : " text-gray"
            }`}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "500",
              border:'none',
              fontSize:'24px',
               borderRadius:'0px',
              position: "relative", // Allow pseudo-element positioning
            }}
            onClick={() => handleTabSwitch("Trending")}
          >
            Trending
            <span
              className={`border-effect ${
                activeTab === "Trending" ? "active" : ""
              }`}
            ></span>
          </button>
          <button
            className={`btn ${
              activeTab === "Featured" ? "bg-white  active text-black" : ""
            }`}
            style={{
              fontWeight: "500",
              padding: "10px 20px",
              cursor: "pointer",
              position: "relative", // Allow pseudo-element positioning
              border:'none',
              borderRadius:'0px',
              fontSize:'24px',
              
            }}
            onClick={() => handleTabSwitch("Featured")}
          >
            Featured
            <span
              className={`border-effect ${
                activeTab === "Featured" ? "active" : ""
              }`}
            ></span>
          </button>
        </div>
        <div className="row align-items-start">
          <div className="col-xl-4 col-lg-5 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              {/* <h3 className="fs-1 text-20">{categories} Products</h3> */}
            </div>
          </div>
          <div className="col-xl-8 text-md-end text-sm-start mb-3 mb-md-0 col-lg-7 col-md-7">
            <div className="sort-filter">
              <select
                style={{
                  width: "40%",
                  padding: "3px",
                  outline: "none",
                  boxShadow: "none",
                  borderRadius: "4px",
                  border:'1px dashed red'
                }}
                id="sort-by-price"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="none">Sort by: Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">{content}</div>
        {/* See More Button */}
        <div className="text-center mt-2">
          <Link href="/shop">
            <button
              className="btn"
              style={{
                backgroundColor: "transparent",
                color: "#990100",
                padding: isMobile ? "5px 10px" : "10px 20px",
                borderRadius: "0px",
                border: "2px dashed #990100",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "16px",
                transition: "background-color 0.3s, color 0.3s, transform 0.3s",
                maxWidth: "50%",
                minWidth: isMobile ? "100px" : "",
                
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#990100";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#990100";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              See More Products
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
       .btn {
    position: relative;
    overflow: hidden;
    background: transparent; /* Ensure background is transparent */
  }

  .border-effect {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: black;
    transition: width 0.3s ease;
  }

  .btn.active .border-effect {
    width: 100%;
  }
      `}</style>
    </section>
  );
};

export default ProductArea;
