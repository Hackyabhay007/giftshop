import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetHeroSliderDataQuery } from "@/redux/api/apiSlice"; // API hook for data fetching

const ShimmerLoader = () => (
  <div className="shimmer-wrapper">
    <div className="shimmer-card"></div>
    <div className="shimmer-card"></div>
    <div className="shimmer-card"></div>
    <style jsx>{`
      .shimmer-wrapper {
        display: flex;
        width: 100%;
        height: 100vh;
      }
      .shimmer-card {
        flex: 1;
        background: #f6f7f8;
        background-image: linear-gradient(
          to right,
          #f6f7f8 0%,
          #edeef1 20%,
          #f6f7f8 40%,
          #f6f7f8 100%
        );
        background-repeat: no-repeat;
        background-size: 800px 100%;
        animation: shimmer 1.5s infinite linear;
      }
      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }

      @media (max-width: 768px) {
        .shimmer-wrapper {
          flex-direction: column;
          height: 180vh;
        }
      }
    `}</style>
  </div>
);

const HomeHero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef(null);
  const { data: sliderData, error, isLoading } = useGetHeroSliderDataQuery();

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentSlide(prev => (prev + 1) % 3);
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentSlide(prev => (prev - 1 + 3) % 3);
    }
  };

  if (isLoading) return <ShimmerLoader />;
  if (error) return <div>Error loading slider data</div>;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "100%",
        height: isMobile ? "auto" : "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={slideRef}
        className="slider-container"
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "80vh" : "100%", // Changed to 80vh
          overflow: "hidden",
        }}
      >
        <div
          className="slides-wrapper"
          style={{
            position: "relative",
            width: isMobile ? "300%" : "100%",
            height: "100%",
            display: "flex",
            transform: isMobile ? `translateX(-${currentSlide * 33.333}%)` : "none",
            transition: "transform 0.5s ease-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {sliderData?.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="hero-card"
              style={{
                width: isMobile ? "100vw" : "33.333333%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.5s ease",
                flex: isMobile ? "none" : "1",
              }}
            >
              <div className="image-container">
                <Image
                  src={item.image}
                  alt={item.heading}
                  fill
                  priority
                  className="hero-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s ease-in-out",
                  }}
                />
                <div className="gradient-overlay" />
                <div className="red-tint" />
              </div>

              <div className="content-container">
                <h3>{item.heading}</h3>
                <p>{item.subheading}</p>
                <Link
                  href={/^[0-9]+$/.test(item.button_link)
                    ? `shop?category=${item.button_link}`
                    : `product-details/${item.button_link}`}
                  className="button-link"
                >
                  {item.button_text}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="dot-indicators">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .hero-card {
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .red-tint {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 0, 0, 0.2);
          mix-blend-mode: multiply;
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.6) 50%,
            rgba(0,0,0,0.8) 100%
          );
          z-index: 2;
          transition: opacity 0.3s ease;
        }

        .content-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          text-align: center;
          z-index: 3;
          transform: translateY(0);
          transition: all 0.3s ease;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 80%, transparent 100%);
        }

        .content-container h3 {
          color: white;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }

        .content-container p {
          color: rgba(255, 255, 255, 0.95);
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          margin: 0 auto 1rem;
          max-width: 85%;
          line-height: 1.4;
          transition: transform 0.3s ease;
        }

        .button-link {
          display: inline-block;
          background: #ff1744;
          color: white;
          padding: 0.8rem 2rem;
          text-decoration: none;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 23, 68, 0.3);
        }

        @media (hover: hover) {
          .hero-card:hover .hero-image {
            transform: scale(1.1);
          }

          .hero-card:hover .red-tint {
            opacity: 0.4;
          }

          .hero-card:hover .content-container {
            transform: translateY(-20px);
          }

          .hero-card:hover .content-container h3 {
            transform: scale(1.1);
          }

          .hero-card:hover .content-container p {
            transform: scale(1.05);
          }

          .button-link:hover {
            background: #ff4081;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 23, 68, 0.5);
          }
        }

        @media (max-width: 768px) {
          .slider-container {
            margin-bottom: 0;
          }

          .hero-card {
            width: 33.333% !important;
            height: 80vh; // Match container height
          }

          .content-container {
            padding-bottom: 70px; // More space for indicators
          }

          .dot {
            width: 10px;
            height: 10px;
            border-width: 1.5px;
          }

          .dot.active {
            background: #ff1744; // Match button color
            border-color: #ff1744;
          }
        }

        .dot-indicators {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 30px;
          backdrop-filter: blur(4px);
        }

        .dot {
          width: 12px;
          height: 12px;
          border: 2px solid white;
          border-radius: 50%;
          padding: 0;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.6;
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
          opacity: 1;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        /* Rest of your existing styles... */
      `}</style>
    </section>
  );
};

export default HomeHero;
