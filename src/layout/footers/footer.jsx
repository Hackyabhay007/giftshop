import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal imports
import logo from "@assets/img/logo/logo.png";
import pay from "@assets/img/icon/payment-option.png";
import social_data from "@/data/social-data";
import { Email, Location } from "@/svg";
import SocialMedia from "@/components/SocialMedial/SocialMedia";
import AppInstallButton from "@/components/AppInstallButton";
import { useIsMobile } from "@/utils/isMobileUtil";
import MobileFooter from "./MobileFooter";
const Footer = ({
  style_2 = false,
  style_3 = false,
  primary_style = false,
}) => {
  const isMobile = useIsMobile(); // Check if it's a mobile device

  if (isMobile) {
    // If mobile, render the MobileFooter component
    return <MobileFooter />;
  }
  return (
    <footer>
      <div
        className={`tp-footer-area ${
          primary_style
            ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6"
            : ""
        } ${
          style_2
            ? "tp-footer-style-2"
            : style_3
            ? "tp-footer-style-2 tp-footer-style-3"
            : ""
        }`}
        style={{ backgroundColor: "#FFFFFF", color: "#000000", borderTop:'4px dotted gray ' }}
      >
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row">
              {/* Footer logo and social media */}
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image
                          style={{ objectFit: "cover", backgroundColor:'#8B0000',borderRadius:'100%' }}
                          src={logo}
                          height={100}
                          width={100}
                          alt="logo"
                        />
                      </Link>

             
                    </div>
                    <SocialMedia />
          
                    <div>
                      <h2 style={{ textTransform: "uppercase",fontSize:"22px" ,marginTop:"20px",color:"black" }}>
                        My Sweet Wishes
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Account section */}
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#000000" }}
                  >
                    My Account
                  </h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a
                          href="profile"
                          style={{
                            color: "#000000",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#000000")
                          }
                        >
                          Track Orders
                        </a>
                      </li>
                      <li>
                        <a
                          href="profile"
                          style={{
                            color: "#000000",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#000000")
                          }
                        >
                          My Account
                        </a>
                      </li>
                      <li>
                        <a
                          href="profile"
                          style={{
                            color: "#000000",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#000000")
                          }
                        >
                          Order History
                        </a>
                      </li>
                      <li>
                        <a
                          href="shippingpolicy"
                          style={{
                            color: "#000000",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#000000")
                          }
                        >
                          Shipping Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Information section */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#000000" }}
                  >
                    Information
                  </h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      {[
                        "Privacy Policy",
                        "Terms and Conditions",
                        "Refund Policy",
                        "Contact Us",
                        "About Us",
                      ].map((item, idx) => (
                        <li key={idx}>
                          <a
                            href={item.toLowerCase().replace(/\s+/g, "")}
                            style={{
                              color: "#000000",
                              transition: "color 0.3s",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#000000")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "#000000")
                            }
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact section */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4
                    className="tp-footer-widget-title"
                    style={{ color: "#000000" }}
                  >
                    Talk To Us 
                  </h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span style={{ color: "#000000" }}>
                        Got Questions? Call us
                      </span>
                      <h4>
                        <a
                          href="tel:999-606-10-15"
                          style={{ color: "#000000", transition: "color 0.3s" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#000000")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#000000")
                          }
                        >
                          +(91) 7404510125
                        </a>
                      </h4>
                    </div>

                    <div className="tp-footer-contact">
                      {/* Email */}
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="mailto:ankit@mysweetwishes.com"
                              style={{
                                color: "#000000",
                                transition: "color 0.3s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#000000")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#000000")
                              }
                            >
                              ankit@mysweetwishes.com
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://maps.app.goo.gl/5RLdim7adFE5E8Ri7"
                              target="_blank"
                              style={{
                                color: "#000000",
                                transition: "color 0.3s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#000000")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#000000")
                              }
                            >
                              83, Mahaveer Complex, Kurukshetra <br /> 136118
                              Haryana
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p style={{ color: "#000000" }}>
                      © {new Date().getFullYear()} All Rights Reserved | Fly
                      Your Tech by{" "}
                      <Link
                        href="/"
                        style={{ color: "#000000", transition: "color 0.3s" }}
                        onMouseEnter={(e) => (e.target.style.color = "#000000")}
                        onMouseLeave={(e) => (e.target.style.color = "#000000")}
                      >
                        ❤
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Payment column moved here */}
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <div className="tp-footer-payment mt-20 text-md-start">
                    <div className="tp-product-details-payment d-flex align-items-start flex-wrap justify-content-between">
                      <p style={{ fontSize: "13px" }}>
                        Guaranteed safe <br /> & secure checkout
                      </p>
                      <Image
                        style={{ objectFit: "cover" }}
                        src={pay}
                        width={100}
                        height={20}
                        alt="payment_option_img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
