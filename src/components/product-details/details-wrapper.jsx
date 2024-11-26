import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { notifyError } from "@/utils/toast"; // Assuming you have a notification utility
import { useIsMobile } from "@/utils/isMobileUtil";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    sku,
    images,
    name,
    description,
    price,
    stock_quantity,
    categories = [],
  } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const buttonStyle = {
    backgroundColor: isHovered ? "#000000" : "#990100",
    color: "#FFFFFF",
    width: "100%",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  // Calculate average rating (if reviews are available)
  const reviews = []; // Replace with actual reviews if available
  useEffect(() => {
    if (reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // Handle add product to cart
  const handleAddProduct = (prd) => {
    if (prd.stock_quantity > 0) {
      dispatch(add_cart_product(prd));
    } else {
      notifyError("Product is out of stock!");
    }
  };

  // Handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // Handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      {/* Product Title */}
      <h3
        className="tp-product-details-title"
        style={{
          fontSize: isMobile ? "20px" : "", // Smaller font size on mobile
        }}
      >
        {name}
      </h3>

      {/* Inventory Details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span
            style={{
              color: "#990100",
              boxShadow: isMobile ? "0 2px 4px rgba(255, 0, 0, 0.2)" : "none", // Light shadow on mobile
              borderRadius: isMobile ? "2px" : "0", // Rounded edges on mobile
              padding: isMobile ? "4px 6px" : "", // Padding on mobile
            }}
          >
            {stock_quantity > 0 ? "▪ In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Product Description */}
      <p>
        {textMore ? description : `${description?.substring(0, 100)}...`}
        <span
          style={{ color: "#990100", cursor: "pointer" }}
          onClick={() => setTextMore(!textMore)}
        >
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      {/* Product Price */}
      <div className="tp-product-details-price-wrapper mb-20">
        <span className="tp-product-details-price new-price">
          Price: ₹{parseFloat(price).toFixed(2)}
        </span>
      </div>

      {/* Product Actions */}
      <h3 className="tp-product-details-action-title">Quantity</h3>
      <ProductQuantity />

      <div
        className={`tp-product-details-action-wrapper ${
          isMobile ? "d-flex flex-row justify-content-between gap-3 pt-20 pb-70" : ""
        }`}
      >
        <div
          className={`tp-product-details-action-item-wrapper ${
            isMobile ? "w-50" : "w-100"
          }`}
        >
          {/* Add to Cart Button */}
          <div
            className={`tp-product-details-add-to-cart ${
              isMobile ? "w-100" : "mb-15 w-100"
            }`}
          >
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={stock_quantity <= 0}
              className={`tp-product-details-add-to-cart-btn ${
                stock_quantity <= 0 ? "disabled" : ""
              }`}
              style={{
                ...(isMobile
                  ? {
                      backgroundColor: "#fff", // White background for mobile
                      color: stock_quantity > 0 ? "#990100" : "#cccccc", // Red text if in stock, gray otherwise
                      border: `2px solid ${stock_quantity > 0 ? "#990100" : "#cccccc"}`, // Red border if in stock
                    }
                  : {
                      backgroundColor: stock_quantity > 0 ? "#990100" : "#cccccc", // Red background for desktop
                      color: "#fff", // White text for desktop
                      cursor: stock_quantity > 0 ? "pointer" : "not-allowed", // Pointer cursor for in-stock
                    }),
                padding: "10px 15px", // Ensure consistent padding
                width: "100%", // Full width for button
              }}
            >
              {stock_quantity > 0 ? "Add To Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Buy Now Button */}
        <div
          className={`tp-product-details-buy-now ${
            isMobile ? "w-50" : "mb-15 w-100"
          }`}
        >
          <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
            <button
              onClick={() => handleAddProduct(productItem)}
              className="tp-product-details-buy-now-btn"
              style={{
                ...buttonStyle,
                padding: "10px 15px", // Ensure consistent padding
                width: "100%", // Full width for button
                border: `2px solid ${stock_quantity > 0 ? "#990100" : "#cccccc"}`, 
              }}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Info if detailsBottom is true */}
      {detailsBottom && (
        <DetailsBottomInfo
          category={categories.length > 0 ? categories[0] : "Unknown Category"}
          sku={sku}
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
