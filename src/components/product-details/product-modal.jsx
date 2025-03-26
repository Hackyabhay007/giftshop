import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleModalClose } from '@/redux/features/productModalSlice';
import DetailsWrapper from './details-wrapper';
import Image from 'next/image';
import { useIsMobile } from "@/utils/isMobileUtil";

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector((state) => state.productModal);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [activeImg, setActiveImg] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Handle image active functionality
  const handleImageActive = (index) => {
    setActiveImg(index);
    setImageLoaded(false); // Reset image loaded state when changing images
  };
  
  // Reset active image when modal opens with a new product
  useEffect(() => {
    if (isModalOpen) {
      setActiveImg(0);
      setImageLoaded(false);
    }
  }, [isModalOpen, productItem]);
  
  return (
    <div className={`tp-product-modal ${isModalOpen ? 'tp-product-modal-opened' : ''}`}>
      <div className="tp-product-modal-wrapper">
        <div className="tp-product-modal-content">
          {/* Close button */}
          <div className="tp-product-modal-close">
            <button 
              onClick={() => dispatch(handleModalClose())} 
              className="tp-product-modal-close-btn"
              style={{
                position: 'absolute',
                right: '15px',
                top: '15px',
                zIndex: 99,
              }}
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          
          {/* Modal Container with improved responsive styling */}
          <div 
            className="tp-product-modal-container"
            style={{
              maxWidth: isMobile ? '100%' : '1000px',
              width: '100%',
              margin: '0 auto',
              padding: isMobile ? '10px' : '25px',
              maxHeight: isMobile ? '92vh' : '85vh',
              overflowY: 'auto',
              borderRadius: isMobile ? '8px' : '12px'
            }}
          >
            {/* Product details row */}
            <div 
              className="row align-items-start"
              style={{
                flexDirection: isMobile ? 'column' : 'row',
                margin: '0',
              }}
            >
              {/* Product image column */}
              <div 
                className="col-lg-6 col-md-6"
                style={{
                  width: isMobile ? '100%' : '50%',
                  paddingRight: isMobile ? '0' : '15px',
                  marginBottom: isMobile ? '15px' : '0'
                }}
              >
                {productItem?.images && productItem.images.length > 0 ? (
                  <>
                    {/* Main product image container */}
                    <div 
                      className="tp-product-details-thumb-wrapper"
                      style={{
                        width: '100%',
                        height: isMobile ? '250px' : '400px',
                        position: 'relative',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Loading indicator */}
                      {!imageLoaded && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                          }}
                        >
                          <div 
                            style={{ 
                              width: '40px',
                              height: '40px',
                              border: '3px solid #f3f3f3',
                              borderTop: '3px solid #990100',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Product image */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          opacity: imageLoaded ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <Image
                          src={productItem.images[activeImg]}
                          alt={productItem.name || "Product image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            padding: '20px',
                          }}
                          onLoad={() => setImageLoaded(true)}
                        />
                      </div>
                    </div>
                    
                    {/* Thumbnail images */}
                    {productItem.images.length > 1 && (
                      <div 
                        className="tp-product-details-nav-preview"
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginTop: '10px',
                          flexWrap: 'wrap',
                          justifyContent: 'flex-start'
                        }}
                      >
                        {productItem.images.map((img, i) => (
                          <div 
                            key={i}
                            onClick={() => handleImageActive(i)}
                            className={`nav-preview-item ${activeImg === i ? 'active' : ''}`}
                            style={{
                              width: '60px',
                              height: '60px',
                              position: 'relative',
                              cursor: 'pointer',
                              border: activeImg === i ? '2px solid #990100' : '1px solid #eee',
                              borderRadius: '4px',
                              backgroundColor: '#f8f8f8',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              <Image
                                src={img}
                                alt={`${productItem.name || "Product"} thumbnail ${i+1}`}
                                fill
                                sizes="60px"
                                style={{
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                  padding: '5px',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div 
                    className="tp-product-details-thumb-wrapper"
                    style={{
                      width: '100%',
                      height: isMobile ? '250px' : '400px',
                      position: 'relative',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                    }}
                  >
                    No image available
                  </div>
                )}
              </div>
              
              {/* Product details column */}
              <div 
                className="col-lg-6 col-md-6"
                style={{
                  width: isMobile ? '100%' : '50%',
                  paddingLeft: isMobile ? '0' : '15px',
                }}
              >
                {productItem && (
                  <div 
                    className="tp-product-details-wrapper modal-details"
                    style={{
                      padding: isMobile ? '0' : '',
                    }}
                  >
                    <DetailsWrapper 
                      productItem={productItem}
                      handleImageActive={handleImageActive}
                      activeImg={activeImg}
                      detailsBottom={false}
                      isModal={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;