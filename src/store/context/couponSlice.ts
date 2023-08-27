import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Coupon } from "../../models/Coupon";

interface ICoupon {
  coupon: Coupon | null;
}

const initialState: ICoupon = {
  coupon: null,
};

export const CouponSlice = createSlice({
  name: "CouponSlice",
  initialState: initialState,
  reducers: {
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});

export const { setCoupon } = CouponSlice.actions;
