import type { LoaderFunction } from "react-router-dom";
import type { AppStore } from "../../../../../config/create-store";
import { GetAllProductsAsync } from "../../../use-case/get-all-products/GetAllProductsAsync";

export const GetAllProductLoader =
  (store: AppStore): LoaderFunction =>
  (l) => {
    store.dispatch(GetAllProductsAsync());
    return null;
  };
