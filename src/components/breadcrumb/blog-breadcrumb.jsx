import React from "react";
import bg from "@assets/img/breadcrumb/breadcrumb-bg-1.jpg";
import { useIsMobile } from "@/utils/isMobileUtil";
const BlogBreadcrumb = () => {
  // Detect if the screen is mobile
  const isMobile = useIsMobile();
  return (
    <section
      className={`breadcrumb__area include-bg breadcrumb__overlay breadcrumb__style-3 ${
        isMobile ? "pt-50 pb-50" : "pt-150 pb-150"
      }`}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content text-center p-relative z-index-1">
              <h3 className="breadcrumb__title">Our Blog</h3>
              <div className="breadcrumb__list">
                <span>
                  <a href="#">Home</a>
                </span>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogBreadcrumb;
