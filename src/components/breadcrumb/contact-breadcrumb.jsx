import React from "react";
import { useRouter } from "next/router";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook

const ContactBreadcrumb = () => {
  const router = useRouter();
  const isMobile = useIsMobile(); // Use the custom hook to check if the device is mobile
  const isContactPage = router.pathname === "/contact"; // Check if current page is Contact
  const isAboutPage = router.pathname === "/aboutus"; // Check if current page is About

  return (
    <section className="breadcrumb__area include-bg text-center pt-55">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <h3
                className="breadcrumb__title"
                style={{
                  fontSize: isMobile ? "24px" : "", // Set font size to 16px for mobile, keep default for desktop
                }}
              >
                {isContactPage
                  ? "Get in Touch"
                  : isAboutPage
                  ? "Learn About Us"
                  : "Keep In Touch with Us"}
              </h3>
              <div className="breadcrumb__list">
                <span
                  style={{ color: "#000000", transition: "color 0.1s" }} // Initial color
                  onMouseEnter={(e) => (e.target.style.color = "#990100")} // Change color on hover
                  onMouseLeave={(e) => (e.target.style.color = "#000000")} // Revert color on hover out
                >
                  <a href="/">Home</a>
                </span>
                <span>
                  {isAboutPage ? "About" : "Contact"} {/* Display "About" or "Contact" based on the page */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;
