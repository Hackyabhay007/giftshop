import React from "react";
import Image from "next/image";
// internal
import ContactForm from "../forms/contact-form";
import contact_icon_1 from "@assets/img/contact/contact-icon-1.png";
import contact_icon_2 from "@assets/img/contact/contact-icon-2.png";
import contact_icon_3 from "@assets/img/contact/contact-icon-3.png";
import ContactSocialMedia from "../SocialMedial/ContactSocialMedia";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook

const ContactArea = () => {
  const isMobile = useIsMobile(); // Use the custom hook to check if the device is mobile

  const mobileStyle = {
    backgroundColor: "#f3f4f6", // Tailwind equivalent of bg-gray-100
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    border: "1px solid #d1d5db", // Tailwind equivalent of border-gray-300
  };

  const iconStyle = {
    marginBottom: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // Tailwind equivalent of bg-gray-100
    borderRadius: "12px",
    padding: "12px",
  };

  return (
    <>
      <section className="tp-contact-area mt-30 pb-100">
        <div className="container">
          <div className="tp-contact-inner">
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-contact-wrapper">
                  <h3 className="tp-contact-title">Send A Message</h3>
                  <div className="tp-contact-form">
                    {/* form start */}
                    <ContactForm />
                    {/* form end */}
                    <p className="ajax-response"></p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                {/* Contact Info Wrapper */}
                <div className="tp-contact-info-wrapper">
                  {/* Email and Phone Card */}
                  <div
                    className="tp-contact-info-item"
                    style={isMobile ? mobileStyle : {}}
                  >
                    <div
                      className="tp-contact-info-icon"
                      style={isMobile ? iconStyle : {}}
                    >
                      <span>
                        <Image src={contact_icon_1} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p data-info="mail">
                        <a href="mailto:theankit.ankit@gmail.com">
                          ankit@mysweetwishes.com
                        </a>
                      </p>
                      <p data-info="phone">
                        <a href="tel:999-606-10-15">+(91) 7404510125</a>
                      </p>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div
                    className="tp-contact-info-item"
                    style={isMobile ? mobileStyle : {}}
                  >
                    <div
                      className="tp-contact-info-icon"
                      style={isMobile ? iconStyle : {}}
                    >
                      <span>
                        <Image src={contact_icon_2} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p>
                        <a
                          href="https://maps.app.goo.gl/5RLdim7adFE5E8Ri7"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          83, mahaveer complex Kurukshetra <br /> 136118 Haryana
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Social Media Card */}
                  <div
                    className="tp-contact-info-item"
                    style={isMobile ? mobileStyle : {}}
                  >
                    <div
                      className="tp-contact-info-icon"
                      style={isMobile ? iconStyle : {}}
                    >
                      <span>
                        <Image src={contact_icon_3} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <div className="tp-contact-social-wrapper mt-5">
                        <h4 className="tp-contact-social-title">Find on social media</h4>
                        <div>
                          <ContactSocialMedia />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of Contact Info Wrapper */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
