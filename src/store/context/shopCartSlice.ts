import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "./api/agent";
import { ShopCart } from "./../../models/ShopCart";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { config } from "../../Base";

interface IShopCart {
  shopCart: ShopCart | null;
}

const initialState: IShopCart = {
  shopCart: null,
};

export const getShopCartAsync = createAsyncThunk<ShopCart, FieldValues>(
  "shopCart/getShopCart",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.ShopCart.getShopCart({
        userId: data.userId,
      });
      //console.log("getShopCartAsync", userDto);
      return userDto;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const createOrder = createAsyncThunk<any, FieldValues>(
  "account/createOrder",
  async (data: any) => {
    try {
      const response = await agent.Orders.createOrder({
        id: data.id,
        paymentMethod: data.paymentMethod,
        paymentImage: data.paymentImage,
        couponId: data.couponId,
        addressId: data.addressId,
        coin: data.coin,
      });

      const hubConnection = new HubConnectionBuilder()
        .withUrl(config.HUB_ADMIN_ORDER!)
        .withAutomaticReconnect()
        .build();

      await hubConnection.start();
      console.log("Log orderId: ", JSON.stringify(response, null, 2));
      if (response && response.orderId) {
        await hubConnection.invoke("SendOrder", response.orderId);
      }
      console.log("response : ", response);
      return response;
    } catch (error: any) {
      console.log("error regter", error);
    }
  }
);

export const ShopCartSlice = createSlice({
  name: "ShopCartSlice",
  initialState: initialState,
  reducers: {
    setShopCart: (state) => {
      state.shopCart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getShopCartAsync.fulfilled), (state, action: any) => {
        // console.log("getShopCart fulfilled");
        state.shopCart = action.payload;
      })
      .addMatcher(isAnyOf(createOrder.fulfilled), (state) => {
        state.shopCart = null;
      });
  },
});

export const { setShopCart } = ShopCartSlice.actions;
