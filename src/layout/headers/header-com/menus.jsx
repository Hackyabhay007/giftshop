import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import OfferCouponArea from "@/components/offerHeader/OfferCouponArea";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeNewArrivalPrdLoader } from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "@/components/products/electronics/product-item";

const Menus = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: 'electronics',
    query: 'new=true'
  });

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <HomeNewArrivalPrdLoader loading={isLoading} />
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;

    content = (
      <div className="row">
        {product_items.slice(0, 4).map((item) => (
          <div key={item._id} className="col-md-3">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    );
  } else {
    // If there are no products or an error occurs, set content to an empty array
    content = [];
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "5px" }}>
      {menu_data.map((menu) => {
        const [isHovered, setIsHovered] = useState(false); // State to track hover

        const linkStyle = {
          color: isHovered ? "#953553" : "#811331", // Change color on hover
          transition: "color 0.3s, background-size 0.3s", // Smooth transition for text color and underline
          fontSize: "16px",
          textDecoration: "none",
          position: "relative",
          display: "inline-block",
          paddingBottom: "2px", // Space for the underline
          backgroundImage: isHovered ? "linear-gradient(to right,rgb(83, 52, 48),rgb(110, 101, 100))" : "none", // Underline color
          backgroundSize: isHovered ? "100% 2px" : "0% 2px", // Animate the underline
          backgroundPosition: "bottom left", // Start the underline from the left
          backgroundRepeat: "no-repeat",
        };

        return menu.homes ? (
          <li
            key={menu.id}
            className="has-mega-menu"
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
          >
            <Link style={linkStyle} href={menu.link}>
              {menu.title}
            </Link>
          </li>
        ) : menu.products ? (
          <li
            key={menu.id}
            className="has-mega-menu"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link style={linkStyle} href={menu.link}>
              {menu.title}
            </Link>
          </li>
        ) : (
          <li key={menu.id}>
            <Link
              style={linkStyle}
              href={menu.link}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {menu.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menus;