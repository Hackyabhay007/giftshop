import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleQuantity } from '@/redux/features/cartSlice';

const ProductQuantity = ({ isModal = false }) => {
  const { quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // handle quantity
  const handleQuantityChange = (type) => {
    dispatch(handleQuantity(type));
  };

  return (
    <div 
      className="tp-product-details-quantity" 
      style={{
        marginBottom: isModal ? '15px' : '20px'
      }}
    >
      <div 
        className="tp-product-quantity mb-15"
        style={{
          marginBottom: isModal ? '10px' : '15px'
        }}
      >
        <span 
          className="tp-cart-minus"
          style={{
            width: isModal ? '35px' : '44px',
            height: isModal ? '35px' : '44px',
            lineHeight: isModal ? '35px' : '40px',
            fontSize: isModal ? '14px' : '16px',
          }}
          onClick={() => handleQuantityChange("decrease")}
        >
          <i className="fa-light fa-minus"></i>
        </span>
        <input 
          className="tp-cart-input" 
          type="text"
          readOnly 
          value={quantity}
          style={{
            width: isModal ? '50px' : '60px',
            height: isModal ? '35px' : '44px',
            fontSize: isModal ? '14px' : '16px',
          }}
        />
        <span 
          className="tp-cart-plus"
          style={{
            width: isModal ? '35px' : '44px',
            height: isModal ? '35px' : '44px',
            lineHeight: isModal ? '35px' : '40px',
            fontSize: isModal ? '14px' : '16px',
          }}
          onClick={() => handleQuantityChange("increase")}
        >
          <i className="fa-light fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
