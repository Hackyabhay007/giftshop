import React from "react";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook

const ContactMap = () => {
  const isMobile = useIsMobile(); // Check if the device is mobile

  // Mobile-specific styles
  const mobileStyle = {
    borderRadius: "8px", // Rounded corners
    marginLeft: "10px", // Add space to the left
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)", // Subtle dark shadow
    overflow: "hidden", // Ensure rounded corners are effective
    border:"2px solid lightgray",
    height:"200px"
  };

  return (
    <>
      <section className="tp-map-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="tp-map-wrapper"
                style={isMobile ? mobileStyle : {}}
              >
                <div className="tp-map-hotspot">
                  <span className="tp-hotspot tp-pulse-border">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="6" fill="#821F40" />
                    </svg>
                  </span>
                </div>
                <div className="tp-map-iframe">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.1250251778783!2d76.88789717547694!3d29.97583672181826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e46c68d01a267%3A0xd6a7c3d1d42a3de7!2s83%2C%20Kurukshetra%20Rd%2C%20Pipli%2C%20Kurukshetra%2C%20Haryana%20136118!5e0!3m2!1sen!2sin!4v1727850262271!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMap;
