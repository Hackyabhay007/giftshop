import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetHeroSliderDataQuery } from "@/redux/api/apiSlice"; // API hook for data fetching

const HomeHero = () => {
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
        flexDirection: isMobile ? "column" : "row", // Column in mobile, Row in desktop
        justifyContent: "space-between",
        width: "100%",
        height: isMobile ? "auto" : "100vh",
        flexWrap: "wrap",
        marginTop: isMobile ? "-7%" : "-2%",
      }}
    >
      {sliderData?.slice(0, 3).map((item, index) => (
        <div
          key={item.id}
          style={{
            width: isMobile ? "100%" : index === 1 ? "40%" : "30%", // Full width in mobile
            height: isMobile ? "auto" : "100%",
            backgroundColor: item.bg_color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            position: "relative",
            textAlign: "center",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector(".hero-image").style.transform = "scale(1.4)";
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
              borderRadius: "10px",
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
          transform: scale(1.4);
        }

        /* Button Hover Effect */
        .button-link {
          background-color: transparent;
          color: white;
          padding: 4px 10px;
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

export default HomeHero;
