import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AccountSlice } from "./context/accountSlice";
import { ProductSlice } from "./context/productSlice";
import { ShopCartSlice } from "./context/shopCartSlice";
import { CouponSlice } from "./context/couponSlice";

export const store = configureStore({
  reducer: {
    account: AccountSlice.reducer,
    product: ProductSlice.reducer,
    shopCart: ShopCartSlice.reducer,
    coupon: CouponSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
