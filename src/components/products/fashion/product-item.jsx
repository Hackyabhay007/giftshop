import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, QuickView } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { useIsMobile } from "@/utils/isMobileUtil";

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" 
      fill="currentColor"/>
  </svg>
);

const ProductItem = ({ product, style_2 = false }) => {
  const { product_id, name, images, categories, price, stock_quantity } =
    product || {};
  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some(
    (prd) => prd.product_id === product_id
  );
  const isAddedToWishlist = wishlist.some(
    (prd) => prd.product_id === product_id
  );
  const dispatch = useDispatch();
  const isMobile = useIsMobile(); // Mobile detection

  useEffect(() => {
    if (product?.reviews && product?.reviews.length > 0) {
      const rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [product?.reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // Handle WhatsApp buy button click
  const handleWhatsAppBuy = () => {
    const whatsappNumber = "919999999999"; // Replace with your actual WhatsApp number
    const productLink = `${window.location.origin}/product-details/${product_id}`;
    const message = `I want to buy this product: ${name} ${productLink}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const actionButtonStyle = {
    '&:hover': {
      backgroundColor: '#800000',
      borderColor: '#800000'
    }
  };

  return (
    <div
      className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`}
      style={{
        minHeight: isMobile ? "340px" : "420px", // Increased height for desktop
        height: "100%", // Ensure full height
        borderRadius: "8px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: "1px solid #f0f0f0",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        margin: isMobile ? "8px 4px" : "0",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
        }
      }}
    >
      <div className="tp-product-thumb-2 p-relative z-index-2 fix">
        <Link href={`/product-details/${product_id}`}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              overflow: "hidden",
              background: "#f8f8f8",
            }}
          >
            <Image
              src={images[0]}
              alt={name}
              layout="fill" // Use fill layout
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "transparent",
                mixBlendMode: "multiply", // Apply your desired blend mode here
                objectFit: "contain",
                padding: "12px",
              }}
            />
          </div>
        </Link>
        <div className="tp-product-badge">
          {stock_quantity === 0 && (
            <span className="product-hot">Out of stock</span>
          )}
        </div>
        {/* product action */}
        <div 
          className="tp-product-action-2 tp-product-action-blackStyle"
          style={{
            '--hover-color': '#800000', // Maroon color variable
          }}
        >
          <div className="tp-product-action-item-2 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                style={{
                  backgroundColor: isAddedToCart ? '#800000' : 'inherit',
                  borderColor: isAddedToCart ? '#800000' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#800000',
                    borderColor: '#800000'
                  }
                }}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  View Cart
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={stock_quantity === 0}
                style={{
                  '&:hover': {
                    backgroundColor: '#800000',
                    borderColor: '#800000'
                  }
                }}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add to Cart
                </span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
              style={{
                '&:hover': {
                  backgroundColor: '#800000',
                  borderColor: '#800000'
                }
              }}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
            
            {/* WhatsApp Buy Button */}
            <button
              type="button"
              onClick={handleWhatsAppBuy}
              className="tp-product-action-btn-2"
              style={{
                marginTop: '5px',
                color: '#25D366', // WhatsApp green color
                '&:hover': {
                  backgroundColor: '#25D366',
                  borderColor: '#25D366',
                  color: '#fff'
                }
              }}
            >
              <WhatsAppIcon />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Buy with WhatsApp
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-2 p-3" style={{ paddingBottom: "12px" }}> {/* Reduced bottom padding */}
        <div className="tp-product-tag-2">
          {/* {categories.map((category, i) => (
            <a key={i} href="#">
              {category}
              {i < categories.length - 1 && ","}
            </a>
          ))} */}
        </div>
        <h3 
          className="tp-product-title-2" 
          style={{ 
            fontSize: isMobile ? "14px" : "16px",
            marginBottom: "4px",
            fontWeight: "500",
            lineHeight: "1.4",
            height: isMobile ? "auto" : "48px", // Fixed height for desktop
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          <Link 
            href={`/product-details/${product_id}`}
            style={{
              color: "#222222",
              transition: "color 0.3s ease",
              '&:hover': {
                color: "#800000"
              }
            }}
          >
            {name}
          </Link>
        </h3>
        <div className="tp-product-rating-icon tp-product-rating-icon-2">
          {/* <Rating
            allowFraction
            size={16}
            initialValue={ratingVal}
            readonly={true}
          /> */}
        </div>
        <div className="tp-product-price-wrapper-2" style={{ marginTop: "4px" }}> {/* Added small top margin */}
          <span
            className="tp-product-price-2 new-price"
            style={{
              color: "#222222",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "600",
              lineHeight: "1"
            }}
          >
            ₹{Number(price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
