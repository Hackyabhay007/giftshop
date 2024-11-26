import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { openCartMini } from "@/redux/features/cartSlice";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";

function MobileFooter() {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity || 0); // Fallback to 0 if undefined

  return (
    <>
      <div className="mobile-footer">
        <div className="mobile-footer-container">
          {/* Home */}
          <Link href="/" className="mobile-footer-item">
            <img
              src="/assets/img/footer/home.svg"
              alt="Home"
              className="icon"
            />
          </Link>

          <div className="divider" />

          {/* Shop */}
          <Link href="/shop" className="mobile-footer-item">
            <img
              src="/assets/img/footer/shop.svg"
              alt="Shop"
              className="icon"
            />
          </Link>

          <div className="divider" />

          {/* Profile */}
          <Link href="/profile" className="mobile-footer-item">
            <img
              src="/assets/img/footer/profile.svg"
              alt="Profile"
              className="icon"
            />
          </Link>

          <div className="divider" />

          {/* Cart */}
          <button
            onClick={() => dispatch(openCartMini())}
            className="mobile-footer-item cart-button"
          >
            <img
              src="/assets/img/footer/cart.svg"
              alt="Cart"
              className="icon"
            />
            {quantity > 0 && (
              <span className="cart-badge">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Mini Sidebar */}
      <CartMiniSidebar />

      {/* Styling */}
      <style jsx>{`
        .mobile-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: white;
          box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          padding: 5px 0;
          z-index: 1000;
        }

        .mobile-footer-container {
          display: flex;
          width: 100%;
          justify-content: space-around;
          align-items: center;
        }

        .mobile-footer-item {
          text-align: center;
          position: relative; /* For badge positioning */
          color: #333;
          text-decoration: none;
        }

        .icon {
          width: 40px;
          height: 40px;
          transition: transform 0.3s;
          padding:7px;
        }

        .mobile-footer-item:hover .icon {
          transform: scale(1.1);
        }

        .divider {
          width: 1px;
          height: 28px;
          background-color: #ccc;
        }

        .cart-button {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -10px;
          background-color: #990100;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
      `}</style>
    </>
  );
}

export default MobileFooter;
