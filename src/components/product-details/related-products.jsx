import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook
// Internal
import { useGetRelatedProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";
import ErrorMsg from "../common/error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";

const RelatedProducts = ({ id }) => {
  const isMobile = useIsMobile(); // Use the custom hook

  // Adjust slider settings based on screen size
  const slider_setting = {
    slidesPerView: isMobile ? 2 : 4, // Show 3 in mobile view
    spaceBetween: isMobile ? 2 : 24, // Smaller spacing in mobile
    navigation: {
      nextEl: ".tp-related-slider-button-next",
      prevEl: ".tp-related-slider-button-prev",
    },
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  };

  const { data: products, isError, isLoading } = useGetRelatedProductsQuery(id);

  // Decide what to render
  let content;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (products?.length > 0) {
    content = (
      <Swiper
        {...slider_setting}
        modules={[Autoplay, Navigation]}
        className="tp-product-related-slider-active swiper-container mb-10"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem
              products={item}
              primary_style={true}
              isMobile={isMobile} // Pass `isMobile` to control styles in ProductItem
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return <div className="tp-product-related-slider">{content}</div>;
};

export default RelatedProducts;
