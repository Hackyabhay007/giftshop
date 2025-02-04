import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import logo from "@assets/img/logo/logo.png";
import useCartInfo from "@/hooks/use-cart-info";
import OffCanvas from "@/components/common/off-canvas";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderCategory from "./header-com/header-category";
import HeaderTopRight from "./header-com/header-top-right";
import HeaderMainRight from "./header-com/header-main-right";
import { useIsMobile } from "@/utils/isMobileUtil";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import { CartTwo, Menu, Phone, ShippingCar } from "@/svg";
import AppInstallButton from "@/components/AppInstallButton";
import CartPopup from "@/components/Cart_pop/CartPopup";
import SearchBar from "@/components/search/SearchBar";

const Header = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  return (
    <>
      <header>
        <div
          style={{ backgroundColor: "#FFFFFF" }}
          className="tp-header-area p-relative z-index-11"
        >
          {/* header top start  */}
          <div
            className="tp-header-top red-bg p-relative z-index-1 d-none d-md-block"
            style={{
              backgroundColor: "#FFFFFF",
              borderBottom: "2px dashed rgb(168, 94, 114)",
              paddingBottom: "10px",
            }}
          >
            <div className="container">
              <div
                className="row align-items-center"
                style={{ padding: "20px 0" }}
              >
                {/* Logo Column */}
                <div
                  className="col-3 d-flex align-items-center"
                  style={{
                    borderRight: "4px dotted #ddd",
                    paddingRight: "15px",
                  }}
                >
                  <div className="logo">
                    <Image
                      src={logo}
                      alt="logo"
                      style={{
                        width: isMobile ? "50px" : "70px",
                        height: isMobile ? "50px" : "70px",
                        objectFit: "cover",
                        backgroundColor: "#8B0000",
                        borderRadius: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* Free Shipping Column */}
                <div
                  className="col-3 d-flex align-items-center"
                  style={{ borderRight: "4px dotted #ddd", padding: "0 15px" }}
                >
                  <div className="tp-header-welcome d-flex align-items-center">
                    <span>
                      <ShippingCar />
                    </span>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        marginLeft: "10px",
                        marginBottom: "0",
                      }}
                    >
                      FREE Express Shipping On Orders Rs500
                    </p>
                  </div>
                </div>

                {/* Phone Number Column */}
                <div
                  className="col-3 d-flex align-items-center justify-content-center"
                  style={{ borderRight: "4px dotted #ddd", padding: "10px" }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#000000",
                      marginBottom: "0",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>
                      <Phone />
                    </span>
                    <a href="tel:999-606-10-15">(+91) 9996061015</a>
                  </p>
                </div>

                {/* Header Top Right Column */}
                <div
                  className="col-3 d-flex align-items-center justify-content-end"
                  style={{ paddingLeft: "15px" }}
                >
                  <div className="tp-header-top-right">
                    <HeaderTopRight />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* header main start */}
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                {/* Mobile Menu Icon (Burger) */}
                <div className="col-6 d-flex d-lg-none">
                  <div className="logo">
                    <Image
                      src={logo}
                      alt="logo"
                      style={{
                        width: isMobile ? "50px" : "70px",
                        height: isMobile ? "50px" : "70px",
                        objectFit: "cover",
                        backgroundColor: "#8B0000",
                        borderRadius: "100%",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setIsCanvasOpen(true)}
                    className="mobile-menu-icon"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {/* <Menu /> */}
                  </button>
                </div>

                {/* Desktop Menu */}
                <div className="col-xl-6 col-lg-6 col-md-8 col-6 d-flex justify-content-start d-none d-lg-block">
                  <div className="main-menu menu-style-1">
                    <nav className="tp-main-menu-content d-flex align-items-center">
                      <Menus />
                      <CartPopup />
                    </nav>
                  </div>
                </div>

                {/* Header Options (Cart, Search, Profile, etc.) */}
                <div className="col-xl-3 col-lg-2 col-md-8 col-6 d-flex justify-content-end align-items-center">
                  <div className="mobile-actions-wrap">
                    <SearchBar />
                    <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
                  </div>
                  <style jsx>{`
                    .mobile-actions-wrap {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      margin-right: 10px;
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

     
      {/* sticky header start */}
      <div
  style={{ backgroundColor: "#FFFFFF" }}
  id="header-sticky-2"
  className={`tp-header-sticky-area p-3 ${sticky ? "header-sticky-2" : ""}`}
>
  <div className="container">
    <div className="tp-mega-menu-wrapper p-relative">
      <div className="row align-items-center">
        {/* Column 1: Logo (Left Side) */}
        <div className="col-xl-2 col-lg-2 col-md-3 col-6">
          <div className="logo">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                style={{
                  width: isMobile ? "50px" : "70px",
                  height: isMobile ? "50px" : "70px",
                  objectFit: "cover",
                  backgroundColor: "#8B0000",
                  borderRadius: "100%",
                }}
              />
            </Link>
          </div>
        </div>

        {/* Column 2: Menu (Only on Desktop) */}
        <div className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block">
          <div className="tp-header-sticky-menu main-menu menu-style-1 d-flex align-items-center">
            <nav id="mobile-menu">
              <Menus />
            </nav>
          </div>
        </div>

        {/* Column 2 & 3: SearchBar + Header Icons (Mobile: Placed Together on Right) */}
        <div className="col-6 d-flex justify-content-end d-md-none">
          <SearchBar />
          <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
        </div>

        {/* Column 3: SearchBar (Only on Desktop) */}
        <div className="col-xl-2 col-lg-2 mt-18 col-md-3 d-none d-md-block">
          <SearchBar />
        </div>

        {/* Column 4: Header Icons (Only on Desktop) */}
        <div className="col-xl-2 col-lg-2 col-md-3 d-none d-md-block text-end">
          <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
        </div>
      </div>
    </div>
  </div>
</div>

      {/* sticky header end */}

     

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />
      {/* off canvas end */}
    </>
  );
};

export default Header;
