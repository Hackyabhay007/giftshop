import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { clearCart, incrementQuantity, decrementQuantity } from "@/redux/features/cartSlice"; // Ensure you have these actions
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);

  return (
    <>
      <section className="tp-cart-area pb-120">
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3>No Cart Items Found</h3>
              <Link
                href="/shop"
                style={{
                  backgroundColor: !hover ? "#990100" : "#000000",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  border: "none",
                }}
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} 
                className="tp-cart-checkout-btn mt-20"
              >
                Continue Shopping
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-9 col-lg-8 col-md-12">
                <div className="tp-cart-list mb-25">
                  <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div>
                  <div className="table-responsive"> {/* Make the table responsive */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="2" className="tp-cart-header-product">
                            Product
                          </th>
                          <th className="tp-cart-header-price">Item Price</th>
                          <th className="tp-cart-header-price">Amount</th>
                          <th className="tp-cart-header-quantity">Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart_products.map((item, i) => (
                          <CartItem key={i} product={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8 col-12">
                      {/* Coupon code section can be added here if needed */}
                    </div>
                    <div className="col-xl-6 col-md-4 col-12">
                      <div className="tp-cart-update text-md-end">
                        <button
                          onClick={() => dispatch(clearCart())}
                          type="button"
                          style={{
                            backgroundColor: !hover ? "#990100" : "#000000", 
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            border: "none",
                          }}
                          onMouseEnter={() => setHover(true)} 
                          onMouseLeave={() => setHover(false)} 
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-12">
                <CartCheckout />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartArea;