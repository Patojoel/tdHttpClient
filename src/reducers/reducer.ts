import { combineReducers } from "@reduxjs/toolkit";
import { ProductSlice } from "../modules/products/slice/ProductsSlice";

export const rootReducer = combineReducers({
    productReducer: ProductSlice.reducer,
});
