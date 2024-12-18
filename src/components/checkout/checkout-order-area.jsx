import React, { useState } from "react";
import { useSelector } from "react-redux";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ register, errors, cartTotal, discountAmount }) => {
  const { cart_products } = useSelector((state) => state.cart);
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: !isHovered ? "#990100" : "#000000",
    color: "#FFFFFF",
    width: "100%",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.name} <span> x {item.orderQuantity}</span>
              </p>
              <span style={{ color: "#990100" }}>
                ₹{Number(item.price * item.orderQuantity).toFixed(2)}
              </span>
            </li>
          ))}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span style={{ color: "#990100" }}>
              ₹{Number(cartTotal + discountAmount).toFixed(2)}
            </span>
          </li>
          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span style={{ color: "#990100" }}>
              ₹
              {(Number(cartTotal + discountAmount).toFixed(2) *
                Number(discountAmount).toFixed(2)) /
                100}
            </span>
          </li>
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span style={{ color: "#990100" }}>
              ₹
              {Number(cartTotal).toFixed(2) -
                (Number(cartTotal + discountAmount).toFixed(2) *
                  Number(discountAmount).toFixed(2)) /
                  100}
            </span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="cod"
            value="cod"
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="online"
            value="online"
          />
          <label htmlFor="online">Pay Online (Razorpay)</label>
        </div>
        <ErrorMsg msg={errors?.payment?.message} />
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          className="w-100"
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
