import React from 'react';
import { useIsMobile } from '@/utils/isMobileUtil';

const ShopBreadcrumb = ({ title, subtitle }) => {
  const isMobile = useIsMobile(); // Mobile detection

  return (
    <>
      <section className="breadcrumb__area include-bg pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3
                  style={{
                    textTransform: "uppercase",
                    fontSize: isMobile ? "32px" : "", // Adjust font size for mobile
                  }}
                  className="breadcrumb__title"
                >
                  {title}
                </h3>
                <div className="breadcrumb__list">
                  <span>
                    <a href="/">Home</a>
                  </span>
                  <span>{subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;
