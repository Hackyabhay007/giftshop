import React from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  const eventChangeValue = (selectedItem) => {
    const valCat = selectedItem.value;

    // Update localStorage based on the selected value
    if (valCat !== "Default Sorting") {
      localStorage.setItem("defaultFilterval", "false");
    }

    // Notify the parent component of the change
    if (selectHandleFilter) {
      selectHandleFilter(selectedItem);
    }
  };

  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={[
            { value: "Default Sorting", text: "Default Sorting" },
            { value: "Low to High", text: "Low to High" },
            { value: "High to Low", text: "High to Low" },
            { value: "New Added", text: "New Added" },
          ]}
          defaultCurrent={0}
          onChange={eventChangeValue} // Handle changes
          name="Default Sorting"
        />
      </div>
      {/* <div className="tp-shop-top-filter">
        <button onClick={()=> dispatch(handleFilterSidebarOpen())} type="button" className="tp-filter-btn">
          <span>
            <Filter />
          </span>
          {" "}Filter
        </button>
      </div> */}
    </div>
  );
};

export default ShopTopRight;
