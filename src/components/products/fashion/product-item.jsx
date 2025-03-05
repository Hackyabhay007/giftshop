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
