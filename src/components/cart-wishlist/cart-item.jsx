import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  const { name, price, orderQuantity = 0, product_id } = product || {};
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const handleAddProduct = () => {
    dispatch(add_cart_product(product));
  };

  const handleDecrement = () => {
    dispatch(quantityDecrement(product));
  };

  const handleRemovePrd = () => {
    dispatch(remove_product({ product_id, name }));
  };

  const QuantityControl = () => (
    <div className="tp-product-quantity d-flex align-items-center">
      <button onClick={handleDecrement} className="tp-cart-minus">
        <Minus />
      </button>
      <input
        className="tp-cart-input"
        type="text"
        value={orderQuantity}
        readOnly
      />
      <button onClick={handleAddProduct} className="tp-cart-plus">
        <Plus />
      </button>
    </div>
  );

  const MobileView = () => (
    <div className="tp-cart-item d-md-none mb-4">
      <div className="tp-cart-item-inner d-flex">
        <div className="tp-cart-img">
          <Link href={`/product-details/${product_id}`}>
            <Image
              src={product.images?.[0] || product.image}
              alt={name || "Product image"}
              width={100}
              height={100}
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="tp-cart-content ms-3 flex-grow-1">
          <h4 className="tp-cart-title">
            <Link
              href={`/product-details/${product_id}`}
              className={hover ? "text-primary" : ""}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {name}
            </Link>
          </h4>
          <div className="tp-cart-price-wrapper d-flex justify-content-between align-items-center mb-2">
            <span className="tp-cart-price">₹{parseFloat(price).toFixed(2)}</span>
            <span className="tp-cart-total">₹{parseFloat(price * orderQuantity).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <QuantityControl />
            <button onClick={handleRemovePrd} className="tp-cart-action-btn">
              <Close />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TableView = () => (
    <tr className="d-none d-md-table-row">
      <td className="tp-cart-img">
        <Link href={`/product-details/${product_id}`}>
          <Image
            src={product.images?.[0] || product.image}
            alt={name || "Product image"}
            width={70}
            height={100}
            quality={100}
          />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link
          href={`/product-details/${product_id}`}
          className={hover ? "text-primary" : ""}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {name}
        </Link>
      </td>
      <td className="tp-cart-price">
        <span>₹{parseFloat(price).toFixed(2)}</span>
      </td>
      <td className="tp-cart-price">
        <span>₹{parseFloat(price * orderQuantity).toFixed(2)}</span>
      </td>
      <td className="tp-cart-quantity">
        <QuantityControl />
      </td>
      <td className="tp-cart-action">
        <button onClick={handleRemovePrd} className="tp-cart-action-btn">
          <Close />
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <MobileView />
      <TableView />
    </>
  );
};

export default CartItem;