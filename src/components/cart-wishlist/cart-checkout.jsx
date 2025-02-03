import React, { useState } from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";

const CartCheckout = () => {
  const { total } = useCartInfo();
  const [shipCost, setShipCost] = useState(0);
  const [hover, setHover] = useState(false);

  // handle shipping cost
  const handleShippingCost = (value) => {
    setShipCost(value === 'free' ? 0 : Number(value));
  };

  // Format price to two decimal places
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between mb-2">
        <span className="tp-cart-checkout-top-title">Subtotal</span>
        <span className="tp-cart-checkout-top-price">₹{formatPrice(total)}</span>
      </div>
      
      {/* Shipping cost options can be added here if needed */}
      
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between mt-2">
        <span className="tp-cart-checkout-total-title">Total</span>
        <span className="tp-cart-checkout-total-price">₹{formatPrice(total + shipCost)}</span>
      </div>
      
      <div className="tp-cart-checkout-proceed mt-4">
        <Link
          href="/checkout"
          className="tp-cart-checkout-btn w-100"
          style={{
            backgroundColor: hover ? "#000000" : "#990100",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            border: "none",
            display: "inline-block",
            textAlign: "center",
            textDecoration: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;