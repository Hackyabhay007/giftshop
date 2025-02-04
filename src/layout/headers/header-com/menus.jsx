import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import OfferCouponArea from "@/components/offerHeader/OfferCouponArea";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeNewArrivalPrdLoader } from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "@/components/products/electronics/product-item";

const Menus = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: 'electronics',
    query: 'new=true'
  });

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <HomeNewArrivalPrdLoader loading={isLoading} />
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;

    content = (
      <div className="row">
        {product_items.slice(0, 4).map((item) => (
          <div key={item._id} className="col-md-3">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    );
  } else {
    // If there are no products or an error occurs, set content to an empty array
    content = [];
  }

  return (
    <ul className="main-menu-list">
      {menu_data.map((menu) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <li 
            key={menu.id}
            className={`menu-item ${menu.homes || menu.products ? 'has-mega-menu' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href={menu.link}>
              {menu.title}
            </Link>
          </li>
        );
      })}

      <style jsx>{`
        .main-menu-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 45px;
        }

        .menu-item a {
          color: #333;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .menu-item a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #A85E72;
          transition: width 0.3s ease;
        }

        .menu-item:hover a {
          color: #A85E72;
        }

        .menu-item:hover a::after {
          width: 100%;
        }

        @media (max-width: 1199px) {
          .main-menu-list {
            gap: 35px;
          }
        }
      `}</style>
    </ul>
  );
};

export default Menus;