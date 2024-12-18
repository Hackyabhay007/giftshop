import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupon_info: undefined,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    set_coupon: (state, { payload }) => {
      state.coupon_info = payload;
      localStorage.setItem("couponInfo", JSON.stringify(payload));
    },
    get_coupons: (state) => {
      const data = localStorage.getItem("couponInfo");
      state.coupon_info = data ? JSON.parse(data) : undefined;
    },
    clear_coupon: (state) => {
      state.coupon_info = undefined;
      localStorage.removeItem("couponInfo");
    },
  },
});

export const { set_coupon, get_coupons, clear_coupon } = couponSlice.actions;
export const loadCouponFromStorage = () => (dispatch) => {
  const data = localStorage.getItem("couponInfo");
  if (data) {
    dispatch(set_coupon(JSON.parse(data)));
  }
};

export default couponSlice.reducer;