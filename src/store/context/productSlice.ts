import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "./api/agent";
import { Product } from "../../models/Product";
import { RootState } from "../store";

interface IProdict {
  products: Product[];
  loading: boolean;
}

const initialState: IProdict = {
  products: [],
  loading: false,
};

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  try {
    const response = await agent.Products.productList();
    thunkAPI.dispatch(setProduct(response)); //วิธีเรียก action ภายในตัวเอง
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setProduct } = ProductSlice.actions;
