import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import Menus from "./header-com/menus";
import logo from "@assets/img/logo/logo.png";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import OffCanvas from "@/components/common/off-canvas";
import { useIsMobile } from "@/utils/isMobileUtil";
import HeaderTopRight from "./header-com/header-top-right";
import HeaderMainRight from "./header-com/header-main-right";
import { Menu, Phone, ShippingCar } from "@/svg";
import SearchBar from "@/components/search/SearchBar";

const HeaderTwo = () => {
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  return (
    <header className="position-relative bg-white">
      {/* Top Bar */}
      <div className="d-none d-lg-block border-bottom border-2" 
           style={{ borderColor: "#A85E72 !important", borderStyle: "dashed !important" }}>
        <div className="container py-2">
          <div className="row align-items-center">
            <div className="col-4">
              <div className="d-flex align-items-center">
                <ShippingCar />
                <span className="ms-2">FREE Express Shipping On Orders Rs500+</span>
              </div>
            </div>
            <div className="col-4 text-center">
              <div className="d-flex align-items-center justify-content-center">
                <Phone />
                <a href="tel:999-606-10-15" className="ms-2">+91 9996061015</a>
              </div>
            </div>
            <div className="col-4 text-end">
              <HeaderTopRight />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`navbar navbar-expand-lg bg-white ${sticky ? 'fixed-top shadow-sm' : ''}`}>
        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* Logo */}
            <Link href="/" className="navbar-brand p-0">
              <Image 
                src={logo} 
                alt="logo" 
                className="rounded-circle"
                style={{
                  width: isMobile ? "45px" : "70px",
                  height: isMobile ? "45px" : "70px",
                  backgroundColor: "#8B0000"
                }}
              />
            </Link>

            {/* Actions for mobile */}
            <div className="d-flex d-lg-none align-items-center gap-3">
              {/* <SearchBar iconOnly={true} /> */}
              <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
              <button 
                className="mobile-menu-btn ms-1"
                onClick={() => setIsCanvasOpen(true)}
                aria-label="Menu"
              >
                <Menu />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="d-none d-lg-flex flex-grow-1 justify-content-center px-5">
              <Menus />
            </div>

            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-4">
              <SearchBar iconOnly={false} />
              <div className="border-start h-75"></div>
              <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu & Other Components */}
      <CartMiniSidebar />
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />

      <style jsx>{`
        .navbar {
          transition: all 0.3s ease;
        }
        .fixed-top {
          animation: slideDown 0.35s ease-out;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        .mobile-menu-btn {
          background: rgba(168, 94, 114, 0.08);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: 8px;
        }

        .mobile-menu-btn:hover {
          background: rgba(168, 94, 114, 0.12);
          transform: scale(1.05);
        }

        .mobile-menu-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </header>
  );
};

export default HeaderTwo;
