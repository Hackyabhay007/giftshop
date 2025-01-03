import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../../public/assets/img/logo/applogo.png";
import { MdRemoveShoppingCart } from "react-icons/md";
import Image from "next/image";
import {
  openCartMini,
  clearCart,
  bulk_add_cart_product,
  ViewCartClear,
} from "@/redux/features/cartSlice";

import Cookies from "js-cookie";

const BASE_URL = "https://apiv2.mysweetwishes.com/api";

// Helper function to get the Authorization header

const userInfo = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : null;
let accessToken = null;

if (userInfo !== null) {
  accessToken = userInfo.accessToken;
}

// Save Cart API
export const saveCart = async (cartItems) => {
  let parsedCartItems = JSON.parse(cartItems);
  const totalAmount = parsedCartItems.reduce((total, item) => {
    return total + item.price * item.orderQuantity;
  }, 0);

  try {
    // Retrieve the cart ID from local storage
    let cartId = getLocalStorage("cart_id");

    // Generate a new guest cart ID if it doesn't exist

    if (!cartId[0]) {
      cartId = `guest-${uuidv4()}`;
      setLocalStorage("cart_id", cartId);
    } else {
      console.log("Using existing cart ID:", cartId);
    }

    const parsedPayload = parsedCartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.orderQuantity,
      price: item.price,
    }));

    // Prepare the request payload
    const payload = {
      cart_id: cartId,
      cart_items: parsedPayload, // List of cart items with product_id, quantity, and price
      total_amount: totalAmount || 0, // Total price of all items
      // Current cart ID
    };

    // Determine the Authorization header dynamically
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Otherwise, use cart ID
    };

    const bodyContent = JSON.stringify(payload);

    // Send the POST request using fetch
    const response = await fetch(`${BASE_URL}/cart/save`, {
      method: "POST",
      headers: headers,
      body: bodyContent, // Convert payload to JSON
    });

    // Check if the response is OK (status code 200-299)

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the API response indicates success
    if (data.status === "success") {
      // Update local storage with the new/updated cart ID and cart items

      console.log("Cart successfully saved with ID:", data);
      return data;
    } else {
      console.error("Failed to save cart:", data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    // Log the error message and server response if available
    console.error("Error saving cart:", error.message);
    throw error; // Rethrow the error for handling by the caller
  }
};

// Get Cart API
export const getCart = async () => {
  try {
    let cartId = getLocalStorage("cart_id");
    if (!cartId && !accessToken) {
      return null;
    }

    if (!cartId) {
      console.error("cart_id is required but not found in local storage");
      return null;
    }

    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {};

    if (accessToken) {
      cartId = accessToken;
    }

    const response = await fetch(`${BASE_URL}/cart/get?cart_id=${cartId}`, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json(); // Parse the JSON response body.

      return data; // Return the fetched cart data.
    } else {
      console.error("Failed to fetch cart: ", response.statusText);
      return null; // Return null if the response is not OK.
    }
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Find Abandoned Cart API
export const findAbandonedCart = async (dynamicId) => {
  try {
    // Get the cartId from the URL path parameters
    // Extract the last part of the URL

    if (!dynamicId) {
      console.error("cartId is required but not found in the URL");
      return null;
    }

    // Log the extracted cartId

    // Assuming accessToken and userInfo are defined elsewhere in your code
    if (accessToken && userInfo?.user?.id) {
      // If accessToken is available, you can use the userInfo.user.id as cartId or modify as per your requirement
      console.log("Using userId as cartId:", userInfo.user.id);
      // Modify the URL call accordingly if necessary
    }

    // Make the API call to find the abandoned cart
    const response = await fetch(
      `${BASE_URL}/cart/find-abandoned?id=${dynamicId}`
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response

    return data;
  } catch (error) {
    console.error(
      "Error finding abandoned cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Main Component to Trigger CartPopup

const PopupCart = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const cartId = localStorage.getItem("cart_id");

    if (cartId) {
      const lastFetchTime = localStorage.getItem("lastFetchTime");
      const currentTime = new Date().getTime();

      // 3 hours in milliseconds
      const threeHours = 3 * 60 * 60 * 1000;

      if (!lastFetchTime || currentTime - lastFetchTime > threeHours) {
        setPopupOpen(true);
        localStorage.setItem("lastFetchTime", currentTime);
      }
    }
  }, []);

  const handleDeny = () => {
    localStorage.removeItem("cart_id");
    setPopupOpen(false);
    dispatch(ViewCartClear());
  };

  const handleViewCart = async () => {
    try {
      dispatch(ViewCartClear());
      let cart = await getCart();

      if (cart && cart.data && cart.data.cart && cart.data.cart.items) {
        cart.data.cart.items.forEach((item) => {
          dispatch(bulk_add_cart_product(item.product));
        });
      } else {
        console.error("Cart data is invalid:", cart);
      }

      dispatch(openCartMini());
      setPopupOpen(false);
    } catch (error) {
      console.error("Error during cart processing:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Popup */}
      {popupOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1050 }}
        >
          <div
            className="bg-white shadow-lg rounded p-4 text-center m-2  d-flex flex-column g-3"
            style={{ maxWidth: "28rem", width: "100%", gap: "6px" }}
          >
            <div>
              <Image
                src={logo}
                alt="logo"
                width={60}
                className="rounded-circle"
              />
            </div>

            <h3 className="tp-section-title" style={{ fontSize: "1.5rem" }}>
              Welcome Back to Sweet Wishes
            </h3>
            <p className="mb-4 text-muted" style={{ fontSize: "1rem" }}>
              You have items in your cart. Would you like to complete your
              previous transaction?
            </p>
            <div className="d-flex justify-content-between">
              <button
                onClick={handleViewCart}
                className="btn"
                style={{
                  backgroundColor: "transparent",
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10%",
                  color: "#990100",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "2px solid #990100",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition:
                    "background-color 0.3s, color 0.3s, transform 0.3s",
                  maxWidth: "50%", // Ensure button doesn't overflow on small screens
                  minWidth: "50%", // Maintain a minimum width on larger screens
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#990100";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#990100";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaCartShopping /> View Cart
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "transparent",
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10%",
                  color: "#000",
                  padding: "10px 10px",
                  borderRadius: "5px",
                  border: "2px solid #000",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition:
                    "background-color 0.3s, color 0.3s, transform 0.3s",
                  maxWidth: "45%",
                  minWidth: "45%", // Ensure button doesn't overflow on small screens
                  // Maintain a minimum width on larger screens
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={handleDeny}
              >
                <MdRemoveShoppingCart /> Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupCart;

export const cartApi = {
  saveCart,
  getCart,
  findAbandonedCart,
};
