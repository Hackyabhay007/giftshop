import { useRouter } from "next/router";
import React from "react";

const ResetButton = ({ resetCategory, shop_right = false }) => {
  const router = useRouter();

  const handleReset = () => {
    localStorage.setItem("defaultFilterval", "true");
    setTimeout(() => {
      localStorage.removeItem("defaultFilterval");
    }, 1000);
    // Clear the category state (resetCategory) and push to the base route
    resetCategory();
    router.push(`/${shop_right ? "shop-right-sidebar" : "shop"}`);
  };

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Reset Filter</h3>
      <button onClick={handleReset} className="tp-btn">
        Reset Filter
      </button>
    </div>
  );
};

export default ResetButton;
