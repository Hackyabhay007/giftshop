import React, { useState } from "react";
import ErrorMsg from "../common/error-msg";
import CouponItem from "./coupon-item";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";
import CouponLoader from "../loader/coupon-loader";

const CouponArea = () => {
  const [copiedCode, setCopiedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();

  let content = null;

  if (isLoading) {
    content = <CouponLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && offerCoupons?.length === 0) {
    content = <ErrorMsg msg="No Coupons found!" />;
  }

  if (!isLoading && !isError && offerCoupons?.length > 0) {
    content = offerCoupons.map((coupon) => (
      <div key={coupon.id} className="col-xl-6">
        <CouponItem
          coupon={coupon}
          handleCopied={handleCopied}
          copied={copied}
          copiedCode={copiedCode}
        />
      </div>
    ));
  }

  return (
    <div className="tp-coupon-area pb-120">
      <div className="container">
        <div className="row">{content}</div>
      </div>
    </div>
  );
};

export default CouponArea;
