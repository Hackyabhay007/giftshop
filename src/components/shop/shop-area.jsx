import React, { useState } from "react";
import Pagination from "@/ui/Pagination";
import ProductItem from "../products/fashion/product-item";
import CategoryFilter from "./shop-filter/category-filter";
import ProductBrand from "./shop-filter/product-brand";
import StatusFilter from "./shop-filter/status-filter";
import TopRatedProducts from "./shop-filter/top-rated-products";
import ShopListItem from "./shop-list-item";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";
import ResetButton from "./shop-filter/reset-button";
import { useIsMobile } from "@/utils/isMobileUtil";

const ShopArea = ({ all_products, products, otherProps, resetCategory }) => {
  const { priceFilterValues, selectHandleFilter, currPage, setCurrPage } =
    otherProps;
  const [filteredRows, setFilteredRows] = useState(products);
  const [pageStart, setPageStart] = useState(0);
  const [showFilters, setShowFilters] = useState(false); // Toggle for mobile filters
  const isMobile = useIsMobile(); // Mobile detection
  const countOfPage = 10;

  const paginatedData = (items, startPage) => {
    setFilteredRows(items);
    setPageStart(startPage);
  };

  return (
    <section className="tp-shop-area pb-120">
      <div className="container">
        <div className="row">
          {isMobile ? (
            <div className="col-12 mb-3">
              {/* Filter Button for Mobile */}
              <button
                className="btn"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  width: "35%", // Set width to 25%
                  backgroundColor: "black", // Ensure black background
                  color: "white", // White text for contrast
                  border: "none", // Remove border for a clean look
                  borderRadius: "0px", // Optional: Rounded corners
                }}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          ) : (
            <div className="col-xl-3 col-lg-4">
              {/* Sidebar for Desktop */}
              <div className="tp-shop-sidebar mr-10">
                <StatusFilter setCurrPage={setCurrPage} />
                <CategoryFilter setCurrPage={setCurrPage} />
                <ResetButton resetCategory={resetCategory} />
              </div>
            </div>
          )}

          <div className={`${isMobile && showFilters ? "col-12" : "col-xl-9 col-lg-8"}`}>
            {/* Filters in Mobile */}
            {isMobile && showFilters && (
              <div className="tp-shop-sidebar mb-3">
                <StatusFilter setCurrPage={setCurrPage} />
                <CategoryFilter setCurrPage={setCurrPage} />
                <ResetButton resetCategory={resetCategory} />
              </div>
            )}

            <div className="tp-shop-main-wrapper">
              <div className="tp-shop-top mb-45">
                <div className="row">
                  <div className="col-xl-6">
                    <ShopTopLeft
                      showing={
                        products.length === 0
                          ? 0
                          : filteredRows.slice(
                              pageStart,
                              pageStart + countOfPage
                            ).length
                      }
                      total={all_products?.length}
                    />
                  </div>
                  <div className="col-xl-6">
                    <ShopTopRight selectHandleFilter={selectHandleFilter} />
                  </div>
                </div>
              </div>
              {products.length === 0 && <h2>No products found</h2>}

              {products.length > 0 && (
                <div className="tp-shop-items-wrapper tp-shop-item-primary">
                  <div className="tab-content" id="productTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="grid-tab-pane"
                      role="tabpanel"
                      aria-labelledby="grid-tab"
                      tabIndex="0"
                    >
                      <div className="row">
                        {filteredRows
                          .slice(pageStart, pageStart + countOfPage)
                          .map((item) => (
                            <div
                              key={item._id}
                              className="col-xl-4 col-md-6 col-sm-6 col-6"
                            >
                              <div
                                style={{ fontSize: "14px" }}
                                className="product-item"
                              >
                                {" "}
                                {/* Adjust font size for mobile */}
                                <ProductItem product={item} />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {products.length > 0 && (
                <div className="tp-shop-pagination mt-20">
                  <div className="tp-pagination">
                    <Pagination
                      items={products}
                      countOfPage={countOfPage}
                      paginatedData={paginatedData}
                      currPage={currPage}
                      setCurrPage={setCurrPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopArea;
