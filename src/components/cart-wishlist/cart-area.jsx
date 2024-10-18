import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 992); // 992px is typically the 'lg' breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkoutStyles = isLargeScreen
    ? { position: 'absolute', top: '60px', right: '20px' }
    : {};

  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {cart_products.length === 0 ? (
          <div className="text-center pt-50">
            <h3>No Cart Items Found</h3>
            <Link
              href="/shop"
              className="tp-cart-checkout-btn mt-20"
              style={{
                backgroundColor: hover ? "#000000" : "#990100",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                fontWeight: "bold",
                border: "none",
                display: "inline-block",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => setHover(true)} 
              onMouseLeave={() => setHover(false)} 
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row" style={{ position: 'relative' }}>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="tp-cart-list mb-25">
                <div className="cartmini__shipping mb-3">
                  <RenderCartProgress />
                </div>
                
                {/* Mobile view for cart items */}
                <div className="d-md-none">
                  {cart_products.map((item, i) => (
                    <CartItem key={i} product={item} />
                  ))}
                </div>
                
                {/* Table view for larger screens */}
                <div className="table-responsive d-none d-md-block">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">Product</th>
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
                <div className="row">
                  <div className="col-12">
                    <div className="tp-cart-update text-start">
                      <button
                        onClick={() => dispatch(clearCart())}
                        type="button"
                        className="tp-cart-checkout-btn"
                        style={{
                          backgroundColor: hover ? "#000000" : "#990100",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          border: "none",
                          transition: "background-color 0.3s ease",
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
              <div style={checkoutStyles}>
                <CartCheckout />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartArea;