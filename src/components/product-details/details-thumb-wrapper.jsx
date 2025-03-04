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
  size,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isMobile = useIsMobile(); // Detect if the device is mobile

  return (
    <>
      <div className="tp-product-details-thumb-wrapper">
        <div className={`d-flex ${isMobile ? 'flex-column-reverse' : 'flex-row gap-4'}`}>
          {/* Thumbnails */}
          <nav
            className={`${
              isMobile ? 'w-100 mt-4' : ''
            }`}
            style={{
              maxHeight: isMobile ? "auto" : "600px",
              overflowY: isMobile ? "visible" : "auto",
              width: isMobile ? "100%" : "120px",
              minWidth: isMobile ? "auto" : "120px",
            }}
          >
            <div 
              className={`nav nav-tabs ${isMobile ? 'flex-row justify-content-center' : 'flex-column'}`}
              style={{ gap: '10px' }}
            >
              {images?.map((item, i) => (
                <button
                  key={i}
                  className={`nav-link ${item === activeImg ? "active" : ""}`}
                  onClick={() => handleImageActive(item)}
                  style={{
                    padding: 0,
                    margin: 0,
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: `2px solid ${item === activeImg ? '#990100' : '#eee'}`,
                    width: isMobile ? "80px" : "100%",
                    height: isMobile ? "80px" : "120px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <Image
                      src={item}
                      alt={`Product thumbnail ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: "6px" }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </nav>

          {/* Main Image */}
          <div 
            className="position-relative flex-grow-1"
            style={{
              maxWidth: isMobile ? "100%" : "calc(100% - 140px)",
            }}
          >
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="tp-product-details-nav-main-thumb">
                  <Image
                    src={activeImg}
                    alt="Product image"
                    width={imgWidth}
                    height={imgHeight}
                    layout="responsive"
                    objectFit="cover"
                    style={{ borderRadius: "8px" }}
                  />
                  {size && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      Size: {size}
                    </div>
                  )}
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
          </div>
        </div>
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
