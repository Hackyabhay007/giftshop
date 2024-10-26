import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";


  const CheckoutArea = () => {
    const router = useRouter();
    const {
      handleSubmit,
      submitHandler,
      register,
      formState, // Destructure formState instead of nested errors
      handleCouponCode,
      couponRef,
      couponApplyMsg,
      cartTotal,
      discountAmount,
      setError,
      watch,
      setValue,
      reset,
      isSubmitting,
      showSuccessModal,
      setShowSuccessModal,
      orderIdForModal,
    } = useCheckoutSubmit();

    const { errors } = formState;

    const [showCard, setShowCard] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
  
    const { cart_products } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

  const handleCheckOrder = () => {
    setShowSuccessModal(false);
    router.push(`/order/${orderIdForModal}`);
  };

  const buttonStyle = {
    backgroundColor: !isHovered ? "#990100" : "#000000",
    color: "#FFFFFF",
    width: "100%",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

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
    <>
      {/* Success Modal */}
      <div 
        className={`fixed inset-0 ${showSuccessModal ? 'block' : 'hidden'}`} 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: showSuccessModal ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div 
          className="modal-dialog modal-dialog-centered"
          style={{
            animation: 'slideDown 0.4s ease-out',
            maxWidth: '450px',
            width: '90%',
            margin: '0 auto'
          }}
        >
          <div 
            className="modal-content rounded-2xl shadow-2xl bg-white p-4 relative"
            style={{ border: '1px solid rgba(153, 1, 0, 0.1)' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#990100',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'rotate(90deg)'}
              onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
            >
              ×
            </button>
            
            {/* Modal Body */}
            <div className="modal-body text-center">
              {/* Success Icon */}
              <div className="mb-8 mt-4">
                <div 
                  style={{
                    width: '90px',
                    height: '90px',
                    margin: '0 auto',
                    backgroundColor: 'rgba(153, 1, 0, 0.08)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(153, 1, 0, 0.2)',
                    boxShadow: '0 0 15px rgba(153, 1, 0, 0.1)'
                  }}
                >
                  <svg 
                    className="text-red" 
                    fill="none" 
                    stroke="#990100" 
                    viewBox="0 0 24 24" 
                    style={{ 
                      width: '45px', 
                      height: '45px',
                      strokeWidth: '2.5px'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4" style={{ color: '#990100' }}>
                Order Confirmed!
              </h3>
              <p className="text-lg mb-3" style={{ color: '#333' }}>
                Thank you for your purchase!
              </p>
              <p className="mb-3" style={{ color: '#333' }}>
                Order ID: <span className="font-semibold">{orderIdForModal}</span>
              </p>
              <p className="text-sm mb-8" style={{ color: '#666' }}>
                You will receive an email confirmation shortly.
              </p>

              {/* Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleCheckOrder}
                  style={{
                    backgroundColor: "#990100",
                    color: "#FFFFFF",
                    width: "100%",
                    border: "none",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#000000"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#990100"}
                >
                  View Order Details
                </button>
                
                <Link
                  href="/shop"
                  onClick={() => setShowSuccessModal(false)}
                  style={{
                    display: "block",
                    padding: "12px",
                    width: "100%",
                    fontSize: "16px",
                    border: "solid 1px #990100",
                    backgroundColor: "transparent",
                    color: "#990100",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "4px",
                    fontWeight: "500",
                    marginTop: "12px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#990100";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#990100";
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Checkout Content */}
      <section 
        className="tp-checkout-area pb-120" 
        style={{ 
          backgroundColor: "#EFF1F5",
          display: showSuccessModal ? 'none' : 'block' 
        }}
      >
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
                      setValue={setValue}
                      reset={reset}
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
                      isSubmitting={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default CheckoutArea;