import { RootState } from "@/config/create-store";
import { createSelector } from "@reduxjs/toolkit";
import { ProductEntityAdapter } from "../models/productEntity";

const getProductState = (state: RootState) => state.productReducer;

const productSelectors = ProductEntityAdapter.getSelectors(getProductState);

const SelectAllProducts = productSelectors.selectAll;

const getLoadingState = createSelector(
  getProductState,
  (state) => state.getAllLoading
);

const getTotalItems = createSelector(
  getProductState,
  (state) => state.totalItems
);
const getCurrentPage = createSelector(
  getProductState,
  (state) => state.currentPage
);

export const ProductSelector = {
  SelectAllProducts,
  getLoadingState,
  getTotalItems,
  getCurrentPage,
};
