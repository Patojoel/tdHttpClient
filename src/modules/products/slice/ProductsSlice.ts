import { createSlice, EntityState } from "@reduxjs/toolkit";
import { ProductEntity, ProductEntityAdapter } from "../models/productEntity";
import { LoadingState } from "@/shared/domain/enums/LoadingState";
import { GetAllProductsAsync } from "../use-case/get-all-products/GetAllProductsAsync";
import { listenWhenProductsRefreshOrPagine } from "../listerners/ListenWhenProductsrefreshOrPagine";
import { GetAllProductsCommand } from "../use-case/get-all-products/GetALLProductCommand";

type ProductState = EntityState<ProductEntity, string> & {
  getAllLoading: LoadingState;
  error: LoadingState;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  getProductsCommand: GetAllProductsCommand;
};

const initialProductsState: ProductState = ProductEntityAdapter.getInitialState(
  {
    getAllLoading: LoadingState.idle,
    error: LoadingState.idle,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 10,
    getProductsCommand: {
      limit: 10,
      page: 1,
    },
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProductsAsync.pending, (state, action) => {
        state.getAllLoading = LoadingState.pending;
        state.getProductsCommand = action.meta.arg;
      })
      .addCase(GetAllProductsAsync.fulfilled, (state, action) => {
        state.getAllLoading = LoadingState.success;
        state.totalItems = action.payload.total;
        ProductEntityAdapter.setAll(state, action.payload.products);
      })
      .addCase(GetAllProductsAsync.rejected, (state) => {
        state.getAllLoading = LoadingState.failed;
      });
  },
});
listenWhenProductsRefreshOrPagine();
