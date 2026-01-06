import {
  apiMiddleware,
  createAppAsyncThunk,
} from "../../../../config/create-app-thunk";
import type { GetAllProductsResponse } from "./GetAllProductsResponse";

export const GetAllProductsAsync = createAppAsyncThunk<GetAllProductsResponse>(
  "products/all",
  async (command, { extra: { productsGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: productsGateway.getAllProducts(),
      rejectWithValue,
    });
  }
);
