import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// internal
import { Minus, Plus } from '@/svg';
import { decrement, increment } from '@/redux/features/cartSlice';

const ProductQuantity = () => {
  const { orderQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Handle viewport detection for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // handleIncrease
  const handleIncrease = () => {
    dispatch(increment());
  };

  // handleDecrease
  const handleDecrease = () => {
    dispatch(decrement());
  };

  return (
    <div className="tp-product-details-quantity">
      <div
        className={`tp-product-quantity mb-15 mr-15`}
        style={{
          ...(isMobile && {
            border: "2px solid #f8d7da", // Light red border
            boxShadow: "0 2px 4px rgba(240, 128, 128, 0.2)", // Light red shadow
            borderRadius: "4px", // Slight rounding for aesthetic
            
          }),
        }}
      >
        <span className="tp-cart-minus" onClick={handleDecrease}>
          <Minus />
        </span>
        <input
          className="tp-cart-input"
          type="text"
          readOnly
          value={orderQuantity}
          style={{
            ...(isMobile && {
              backgroundColor: "#fff", // Ensures input background consistency
            }),
          }}
        />
        <span className="tp-cart-plus" onClick={handleIncrease}>
          <Plus />
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
