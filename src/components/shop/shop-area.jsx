import React, { useState } from "react";
import Pagination from "@/ui/Pagination";
import ProductItem from "../products/fashion/product-item";
import CategoryFilter from "./shop-filter/category-filter";
import StatusFilter from "./shop-filter/status-filter";
import ResetButton from "./shop-filter/reset-button";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";
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
            <>
              {/* Sticky Filter Button for Mobile */}
              <div
                className="col-12"
                style={{
                  position: "sticky",
                  top: "110px", // Adjusted top position
                  zIndex: "1000",
                }}
              >
                <button
                  className="btn"
                  onClick={() => setShowFilters(!showFilters)}
                  style={{
                    width: "35%",
                    border: "none", // Remove border
                    backgroundColor: "black",
                    color: "white",
                    marginBottom: "12px",
                    borderRadius: "0px",
                  }}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {/* Filters for Mobile */}
              {showFilters && (
                <div
                  className="col-12 tp-shop-sidebar mb-3"
                  style={{
                    position: "sticky",
                    top: "160px", // Adjusted position below the button
                    zIndex: "1000",
                    padding: "10px",
                    backgroundColor: "white",
                    maxHeight: "400px", // Restrict height for scrolling
                    overflowY: "auto", // Add vertical scrolling
                    border: "1px solid #ddd", // Optional for better visibility
                    borderRadius: "5px", // Rounded edges for better aesthetics
                  }}
                >
                  <StatusFilter setCurrPage={setCurrPage} />
                  <CategoryFilter setCurrPage={setCurrPage} />
                  <ResetButton resetCategory={resetCategory} />
                </div>
              )}
            </>
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

          <div
            className={`${
              isMobile && showFilters ? "col-12" : "col-xl-9 col-lg-8"
            }`}
          >
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
