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
        flexDirection: isMobile ? "column" : "row",
        width: "100vw",
        height: isMobile ? "300vh" : "100vh", // Triple height on mobile
        margin: 0,
        padding: 0,
      }}
    >
      {sliderData?.slice(0, 3).map((item) => (
        <div
          key={item.id}
          style={{
            width: isMobile ? "100%" : "33.333333%",
            height: isMobile ? "33.333333%" : "100%", // Equal height sections on mobile
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Image with Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={item.image}
              alt="Background Image"
              fill
              className="hero-image"
              style={{
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />
            {/* Gradient Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
              }}
            />
          </div>

          {/* Content Container - Moved to bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "2rem",
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <h3 style={{ 
              fontSize: "clamp(1.5rem, 2vw, 2rem)", 
              fontWeight: "bold", 
              marginBottom: "0.5rem", 
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}>
              {item.heading}
            </h3>
            <p style={{ 
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)", 
              marginBottom: "1rem", 
              color: "white",
              opacity: 0.9,
            }}>
              {item.subheading}
            </p>
            <Link
              href={/^[0-9]+$/.test(item.button_link)
                ? `shop?category=${item.button_link}`
                : `product-details/${item.button_link}`}
              legacyBehavior
            >
              <a className="button-link">{item.button_text}</a>
            </Link>
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
