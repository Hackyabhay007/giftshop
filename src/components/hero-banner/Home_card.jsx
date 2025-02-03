import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetHeroSliderDataQuery } from "@/redux/api/apiSlice"; // API hook for data fetching

const HomeCard = () => {
  const { data: sliderData, error, isLoading } = useGetHeroSliderDataQuery();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize(); // Check on initial render
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading slider data</div>;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Column on mobile, Row on desktop
        justifyContent: "space-between",
        gap: "5px", // Gap between the cards
        width: "100%",
        height: isMobile ? "auto" : "70vh",
        flexWrap: "wrap",
        
        paddingLeft: "20px", // Added left padding
        paddingRight: "20px", // Added right padding
        paddingTop:'5%',
      }}
    >
      {sliderData?.slice(3, 6).map((item, index) => (
        <div
          key={item.id}
          style={{
            width: isMobile ? "100%" : "30%", // Full width on mobile, 30% on desktop
            height: isMobile ? "auto" : "350px", // Set a fixed height to make cards smaller
            backgroundColor: item.bg_color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "15px", // Rounded corners for each card
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
            position: "relative",
            textAlign: "center",
            transition: "transform 0.3s ease",
            overflow: "hidden",
            paddingBottom:'42px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector(".hero-image").style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector(".hero-image").style.transform = "scale(1)";
          }}
        >
          {/* Image (Scales on Hover of Card) */}
          <div
            style={{
              width: "250px",
              height: "250px",
              overflow: "hidden",
              borderRadius: "10px", // Square-shaped image with rounded corners
            }}
          >
            <Image
              src={item.image}
              alt="Slider Image"
              width={250}
              height={250}
              className="hero-image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          {/* Text and Button */}
          <div style={{ zIndex: 2 }}>
            <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "white" }}>
              {item.heading}
            </h3>
            <p style={{ fontSize: "18px", marginBottom: "15px", color: "white" }}>{item.subheading}</p>
            <div>
              <Link
                href={
                  /^[0-9]+$/.test(item.button_link)
                    ? `shop?category=${item.button_link}`
                    : `product-details/${item.button_link}`
                }
                legacyBehavior
              >
                <a className="button-link">
                  {item.button_text}
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        /* Image Hover Effect */
        .hero-card:hover .hero-image {
          transform: scale(1.2);
        }

        /* Button Hover Effect */
        .button-link {
          background-color: transparent;
          color: white;
          padding: 6px 12px;
          text-decoration: none;
          font-weight: bold;
          border-bottom: 2px dashed white;
          position: relative;
          transition: color 0.3s ease;
        }
        .button-link:hover {
          color: red;
        }
        .button-link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: red;
          left: 0;
          bottom: -2px;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: right;
        }
        .button-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default HomeCard;
