import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";
import { useIsMobile } from "@/utils/isMobileUtil";

const DetailsThumbWrapper = ({
  images,
  handleImageActive,
  activeImg,
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isMobile = useIsMobile(); // Detect if the device is mobile

  return (
    <>
      <div
        className={`tp-product-details-thumb-wrapper tp-tab flex ${
          isMobile ? "flex-col" : "d-sm-flex"
        }`}
      >
        {/* Main Image */}
        <div
          className={`tab-content m-img ${
            isMobile ? "order-0 w-full" : "order-1 w-full"
          }`}
          style={{
            maxWidth: isMobile ? "100%" : "600px",
            margin: isMobile ? "" : "0 auto", // Remove margin in mobile
          }}
        >
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <Image
                src={activeImg}
                alt="Product image"
                width={imgWidth}
                height={imgHeight}
                layout="responsive"
                objectFit="cover"
                style={{
                  borderRadius: "8px",
                  width: isMobile ? "100%" : "100%",

                  boxShadow: isMobile
                    ? "1px 5px 20px rgba(0, 0, 0, 0.1)"
                    : "none",
                }}
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">Out of Stock</span>
                )}
              </div>
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <nav
          className={`${isMobile ? "order-1 w-full mt-4" : "order-0 w-1/4"}`}
          style={{
            maxHeight: isMobile ? "auto" : "800px",
            overflowY: isMobile ? "visible" : "auto",
            padding: isMobile ? "0" : "10px", // Remove padding in mobile
          }}
        >
          <div className="nav nav-tabs flex-col">
            {images?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item === activeImg ? "active" : ""}`}
                onClick={() => handleImageActive(item)}
                style={{
                  padding: 0,
                  marginBottom: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: isMobile ? "2px solid #d3d3d3" : "none", // Gray border in mobile
                  boxShadow: isMobile ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none", // Shadow in mobile
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Image
                    src={item}
                    alt={`Product thumbnail ${i + 1}`}
                    width={imgWidth}
                    height={imgHeight}
                    layout="responsive"
                    objectFit="cover"
                    style={{
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Video Popup */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default DetailsThumbWrapper;
