import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import Legal from "@/components/Legal";
import shippingpolicy from "@/data/shippingpolicy"; 

const ShippingPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Shipping Policy" />
      <HeaderTwo style_2={true} />
      <Legal terms={shippingpolicy} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShippingPage;
