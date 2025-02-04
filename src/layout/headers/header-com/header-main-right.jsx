import { useGetUserQuery } from "@/redux/features/auth/authApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Menu, User } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import Loader from "@/components/loader/loader";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import { PiUserCircleLight } from "react-icons/pi";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const user = useSelector((state) => state.auth.user); // Accessing the user state
  const { quantity } = useCartInfo();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(false); // State to track hovered item

  return (
    <div className="header-actions d-flex align-items-center">
      {/* User Section */}
      <div className="d-none d-lg-block me-4">
        <div className="d-flex align-items-center">
          <div className="" style={{ marginRight: "8px" }}>
            <span>
              {user?.imageURL ? (
                <Link href="/profile">
                  <PiUserCircleLight
                    style={{
                      fontWeight: "lighter",
                      color: "#fff",
                      cursor: "pointer", // Changes cursor to pointer on hover
                    }}
                    size={34}
                  />
                </Link>
              ) : user?.name ? (
                <Link href="/profile">
                  <h2
                    style={{ color: "white" }}
                    className="text-uppercase login_text"
                  >
                    {user.name[0]}{" "}
                    {/* Display the first letter of user's name */}
                  </h2>
                </Link>
              ) : (
                <PiUserCircleLight
                  style={{ fontWeight: "lighter", color: "black" }}
                  size={36}
                />
              )}
            </span>
          </div>
          <div className="tp-header-login-content d-none d-xl-block">
            {!user ? (
              <>
                <Link href="/login">
                  <span style={{ color: "black" }}>Hello,</span>
                </Link>
                <div className="tp-header-login-title">
                  <Link style={{ color: "black" }} href="/login">
                    Sign In
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span style={{ color: "black" }}>Hello, {user.name}</span>
                <div className="tp-header-login-title">
                  <Link
                    style={{ color: "black", fontSize: "12px" }}
                    href="/profile"
                  >
                    Your Account
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Button */}
      <button
        onClick={() => dispatch(openCartMini())}
        className="cart-button"
        onMouseEnter={() => setHoveredItem(true)}
        onMouseLeave={() => setHoveredItem(false)}
      >
        <CartTwo />
        <span className="cart-badge">{quantity}</span>
      </button>

      <style jsx>{`
        .header-actions {
          gap: 20px;
        }
        .cart-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          position: relative;
          color: ${hoveredItem ? "#000000" : "#666"};
          transition: color 0.2s ease;
        }
        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #990100;
          color: white;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fff;
        }
      `}</style>
    </div>
  );
};

export default HeaderMainRight;
