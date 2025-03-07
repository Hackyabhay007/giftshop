import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// Internal
import { Cart, QuickView } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {
  const {
    id,
    name,
    images,
    categories,
    sku,
    price,
    stock_quantity,
    product_id,
    status,
    offerDate,
  } = product || {};
  const dispatch = useDispatch();

  // Redux state for cart and wishlist
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart_products.some((prd) => prd.id === id);
  const isAddedToWishlist = wishlist.some((prd) => prd.id === id);

  // State for rating
  const [ratingVal, setRatingVal] = useState(0);

  // Dummy reviews for illustration, replace this with actual review data
  const reviews = [];

  // Calculate average rating from reviews
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

  // Handle adding product to cart
  const handleAddProduct = () => {
    const productToAdd = {
      product_id,
      name,
      image: images[0], // Use the first image
      price,
      stock_quantity,
      // Assuming there's a discount logic to be included here
    };
    dispatch(add_cart_product(productToAdd));
  };

  // Handle adding product to wishlist
  const handleWishlistProduct = () => {
    dispatch(add_to_wishlist(product));
  };

  const [isHovered, setIsHovered] = useState(false);

  // Check if the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust width threshold for mobile
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`
        ${offer_style ? "tp-product-offer-item" : "mb-25"} 
        tp-product-item transition-3 
        ${isMobile ? "m-0" : ""}  // Adding mobile-specific margin
      `}
      style={{ height: isMobile ? "auto" : "unset", zIndex: "3", border:'none', boxShadow:'none' }} // Full height for mobile cards
    >
      <div
        style={{
          overflow: "hidden",
          height: isMobile ? "100px" : "300px", // Set height of image for mobile
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} // Flexbox centering
        className="tp-product-thumb p-relative fix"
      >
        <Link href={`/product-details/${product_id}`}>
          <Image
            src={images[0]} // Use the first image
            width={isMobile ? 100 : 300} // Adjust width based on your layout
            height={isMobile ? 100 : 300} // Adjust height for mobile
            alt={name} // Use product name for alt text
            className="w-full h-auto"
            style={{
              objectFit: "contain",
              maxWidth: isMobile ? "100px" : "100%",
              maxHeight: "100%",
            }} // Keep the image contained within its container
          />
        </Link>

        {/* Product badge for out-of-stock status */}
        <div className="tp-product-badge">
          {stock_quantity === "out-of-stock" && (
            <span className="product-hot">Out of Stock</span>
          )}
        </div>

        {/* Product action buttons */}
        <div className="tp-product-action">
          <style jsx>{`
            .tp-product-action-btn {
              background-color: white;
              border: 1px solid white;
              color: black;
              transition: background-color 0.3s ease, border-color 0.3s ease;
            }

            .tp-product-action-btn:hover {
              background-color:rgb(231, 12, 103);

              color: white;
            }
          `}</style>

          <div className="tp-product-action-item d-flex flex-column">
            {isAddedToCart ? (
              <Link href="/cart">
                <button
                  className={`tp-product-action-btn  tp-product-add-cart-btn`}
                >
                  <Cart />
                  <span className="tp-product-tooltip">View Cart</span>
                </button>
              </Link>
            ) : (
              <button
                onClick={handleAddProduct}
                type="button"
                className={`tp-product-action-btn ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={stock_quantity === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}

            <button
              onClick={() => dispatch(handleProductModal(product))}
              type="button"
              className="tp-product-action-btn tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product content */}
      <div className="tp-product-content  text-center ">
        <h3 className="tp-product-title">
          <Link href={`/product-details/${id}`}>
            <span
              style={{
                overflow: "hidden",
                fontSize: "16px",
                textTransform: "uppercase",
                transition: "color 0.3s",
                whiteSpace: isMobile ? "normal" : "nowrap",
                textOverflow: isMobile ? "unset" : "ellipsis",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#990100")}
              onMouseLeave={(e) => (e.target.style.color = "")}
            >
              {name}
            </span>
          </Link>
        </h3>

        <div className="tp-product-price-wrapper">
          <span
            className="tp-product-price new-price "
            style={{ color: "#990100" }}
          >
            ₹ {parseFloat(price).toFixed(2)}
          </span>
        </div>
        <div className="tp-product-stock-status">
          <span>In Stock: {stock_quantity}</span>
        </div>

        {/* Countdown timer for offers */}
        {offer_style && offerDate && (
          <div className="tp-product-countdown">
            <div className="tp-product-countdown-inner">
              {dayjs().isAfter(offerDate.endDate) ? (
                <ul>
                  <li>
                    <span>{0}</span> Days
                  </li>
                  <li>
                    <span>{0}</span> Hrs
                  </li>
                  <li>
                    <span>{0}</span> Min
                  </li>
                  <li>
                    <span>{0}</span> Sec
                  </li>
                </ul>
              ) : (
                <Timer expiryTimestamp={new Date(offerDate.endDate)} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
