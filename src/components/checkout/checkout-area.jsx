import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    cartTotal,
    discountAmount,
    setError,
    watch,
  } = useCheckoutSubmit();

  const [showCard, setShowCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const linkStyle = {
    display: "block",
    padding: "10px",
    margin: "auto",
    width: "35%",
    fontSize: "15px",
    border: "solid 1px black",
    backgroundColor: isHovered ? "#990100" : "transparent",
    color: isHovered ? "#fff" : "#000",
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  const onSubmit = async (data) => {
    if (selectedAddress) {
      // Use the selected address
      data = { ...data, ...selectedAddress };
    }
    try {
      await submitHandler(data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const { errors } = error.response.data;
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field, {
            type: "manual",
            message: messages[0]
          });
        });
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <section className="tp-checkout-area pb-120" style={{ backgroundColor: "#EFF1F5" }}>
      <div className="container">
        {cart_products.length === 0 && (
          <div className="text-center pt-50">
            <h3 className="py-2">No items found in cart to checkout</h3>
            <Link 
              style={linkStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              href="/shop" 
              className="tp-btn tp-btn-border"
            >
              Return to shop
            </Link>
          </div>
        )}
        {cart_products.length > 0 && (
          <div className="row">
            <div className="col-xl-7 col-lg-7">
              <CheckoutCoupon
                handleCouponCode={handleCouponCode}
                couponRef={couponRef}
                couponApplyMsg={couponApplyMsg}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-7">
                  <CheckoutBillingArea 
                    register={register} 
                    errors={errors} 
                    setError={setError}
                    watch={watch}
                    user={user}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />
                </div>
                <div className="col-lg-5">
                  <CheckoutOrderArea
                    register={register}
                    errors={errors}
                    cartTotal={cartTotal}
                    discountAmount={discountAmount}
                    setShowCard={setShowCard}
                    showCard={showCard}
                    cart_products={cart_products}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutArea;