import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "../modules/auth/slice/AuthSlice";
import { ProductSlice } from "../modules/products/slice/ProductsSlice";

export const rootReducer = combineReducers({
  productReducer: ProductSlice.reducer,
  authReducer: AuthSlice.reducer,
});
