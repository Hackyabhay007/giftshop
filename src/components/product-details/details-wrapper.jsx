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

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" 
      fill="currentColor"/>
  </svg>
);

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
  isModal = false, // New prop to determine if used inside modal
}) => {
  const {
    sku,
    images,
    name,
    description,
    price,
    stock_quantity,
    categories = [],
    created_at,
    manufacturing_date,
    expiry_date,
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

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return "";
      
      // Format date: DD MMM YYYY
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

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

  // Handle WhatsApp buy button click
  const handleWhatsAppBuy = () => {
    const whatsappNumber = "7404510125"; // Replace with your actual WhatsApp number
    const productLink = `${window.location.origin}/product-details/${productItem.product_id}`;
    const message = `I want to buy this product: ${name} ${productLink}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="tp-product-details-wrapper">
      {/* Product Title */}
      <h3
        className="tp-product-details-title"
        style={{
          fontSize: isMobile ? "18px" : "22px",
          marginBottom: isModal ? '10px' : '15px',
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
              boxShadow: isMobile ? "0 2px 4px rgba(255, 0, 0, 0.2)" : "none",
              borderRadius: isMobile ? "2px" : "0",
              padding: isMobile ? "2px 4px" : "",
              fontSize: isModal ? '14px' : 'inherit',
            }}
          >
            {stock_quantity > 0 ? "▪ In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Date Information (if available) */}
        {(manufacturing_date || expiry_date) && !isModal && (
          <div className="tp-product-details-date ms-4" style={{ fontSize: '14px', color: '#666' }}>
            {manufacturing_date && (
              <div>Mfg: {formatDate(manufacturing_date)}</div>
            )}
            {expiry_date && (
              <div>Exp: {formatDate(expiry_date)}</div>
            )}
          </div>
        )}
      </div>

      {/* Product Description */}
      {!isModal || !isMobile ? (
        <p style={{
          fontSize: isModal ? '14px' : 'inherit',
          lineHeight: isModal ? '1.4' : 'inherit',
          marginBottom: isModal ? '10px' : '15px',
        }}>
          {textMore ? description : `${description?.substring(0, isModal ? 80 : 100)}...`}
          <span
            style={{ color: "#990100", cursor: "pointer", marginLeft: '5px' }}
            onClick={() => setTextMore(!textMore)}
          >
            {textMore ? "See less" : "See more"}
          </span>
        </p>
      ) : null}

      {/* Product Price */}
      <div className="tp-product-details-price-wrapper mb-20" style={{marginBottom: isModal ? '10px' : '20px'}}>
        <span 
          className="tp-product-details-price new-price"
          style={{fontSize: isModal ? '18px' : 'inherit'}}
        >
          Price: ₹{parseFloat(price).toFixed(2)}
        </span>
      </div>

      {/* Product Actions */}
      <h3 
        className="tp-product-details-action-title"
        style={{fontSize: isModal ? '15px' : 'inherit', marginBottom: isModal ? '5px' : 'inherit'}}
      >
        Quantity
      </h3>
      <ProductQuantity isModal={isModal} />

      <div
        className={`tp-product-details-action-wrapper ${
          isMobile
            ? "d-flex flex-row justify-content-between gap-3 pt-10 pb-20"
            : ""
        }`}
        style={{
          marginTop: isModal ? '10px' : '',
          marginBottom: isModal ? '10px' : '',
        }}
      >
        <div
          className={`tp-product-details-action-item-wrapper ${
            isMobile ? "w-50" : "w-100"
          }`}
        >
          {/* Add to Cart Button */}
          <div
            className={`tp-product-details-add-to-cart ${
              isMobile ? "w-100" : `mb-${isModal ? '10' : '15'} w-100`
            }`}
          >
            {stock_quantity > 0 ? (
              <button
                onClick={() => handleAddProduct(productItem)}
                disabled={stock_quantity <= 0}
                className={`tp-product-details-add-to-cart-btn ${
                  stock_quantity <= 0 ? "disabled" : ""
                }`}
                style={{
                  ...(isMobile
                    ? {
                        backgroundColor: "#fff",
                        color: stock_quantity > 0 ? "#990100" : "#cccccc",
                        border: `2px solid ${
                          stock_quantity > 0 ? "#990100" : "#cccccc"
                        }`,
                      }
                    : {
                        backgroundColor:
                          stock_quantity > 0 ? "#990100" : "#cccccc",
                        color: "#fff",
                        cursor: stock_quantity > 0 ? "pointer" : "not-allowed",
                      }),
                  padding: isModal ? "8px 12px" : "10px 15px",
                  width: "100%",
                  fontSize: isModal ? '14px' : 'inherit',
                  fontWeight: isModal ? '500' : 'inherit',
                }}
              >
                Add To Cart
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <div
          className={`tp-product-details-buy-now ${
            isMobile ? "w-50" : `mb-${isModal ? '10' : '15'} w-100`
          }`}
        >
          <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
            <button
              onClick={() => handleAddProduct(productItem)}
              className="tp-product-details-buy-now-btn"
              style={{
                ...buttonStyle,
                padding: isModal ? "8px 12px" : "10px 15px",
                width: "100%",
                border: `2px solid ${
                  stock_quantity > 0 ? "#990100" : "#cccccc"
                }`,
                fontSize: isModal ? '14px' : 'inherit',
                fontWeight: isModal ? '500' : 'inherit',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>
      
      {/* WhatsApp Buy Button */}
      <div className="tp-product-details-buy-whatsapp w-100 mb-15" style={{marginBottom: isModal ? '10px' : '15px'}}>
        <button
          onClick={handleWhatsAppBuy}
          className="tp-product-details-buy-now-btn"
          style={{
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            width: "100%",
            border: "none",
            padding: isModal ? "8px 12px" : "10px 15px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: isModal ? '14px' : 'inherit',
            fontWeight: isModal ? '500' : 'inherit',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#128C7E"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#25D366"}
        >
          <WhatsAppIcon /> Buy with WhatsApp
        </button>
      </div>

      {/* Bottom Info if detailsBottom is true */}
      {detailsBottom && (
        <>
          <DetailsBottomInfo
            category={categories.length > 0 ? categories[0] : "Unknown Category"}
            sku={sku}
          />
          
          {/* Additional date information in product details page */}
          {(manufacturing_date || expiry_date || created_at) && (
            <div className="tp-product-details-date-info mt-20">
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Product Information</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
                {created_at && (
                  <li style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 500, marginRight: '5px' }}>Listed on:</span>
                    {formatDate(created_at)}
                  </li>
                )}
                {manufacturing_date && (
                  <li style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 500, marginRight: '5px' }}>Manufacturing Date:</span>
                    {formatDate(manufacturing_date)}
                  </li>
                )}
                {expiry_date && (
                  <li style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 500, marginRight: '5px' }}>Expiry Date:</span>
                    {formatDate(expiry_date)}
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsWrapper;
