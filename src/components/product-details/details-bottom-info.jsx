import React from "react";
import Image from "next/image";
import payment_option_img from "@assets/img/product/icons/payment-option.png";
import ContactSocialMedia from "../SocialMedial/ContactSocialMedia";

const DetailsBottomInfo = ({ sku, category, tag }) => {
  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div>
        {/* <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{category}</p>
        </div> */}
        {/* <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p>{tag}</p>
        </div> */}
      </div>

      {/*  product-details-social*/}

      <div style={{ marginBottom: "10px" }} className="">
        <span>Share: </span>
        <ContactSocialMedia />
      </div>

      {/* product-details-msg */}

      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>7404510125</li>
          <li>Order yours before 2.30pm for same day dispatch</li>
        </ul>
      </div>
      {/* product-details-payment */}
      <div  className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Guaranteed safe <br /> & secure checkout
        </p>
        <Image style={{objectFit:"cover"}}  src={payment_option_img} width={100} height={60} alt="payment_option_img" />
      </div>
    </>
  );
};

export default DetailsBottomInfo;
