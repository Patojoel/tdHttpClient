import type { LoaderFunction } from "react-router-dom";
import type { AppStore } from "../../../../../config/create-store";
import { GetAllProductsAsync } from "../../../use-case/get-all-products/GetAllProductsAsync";
import { ProductsActions } from "../../../actions/GetProductsActions";

export const GetAllProductLoader =
  (store: AppStore): LoaderFunction =>
  (l) => {
    const params = Object.fromEntries(
      new URLSearchParams(l.request.url.split("?")[1] ?? "")
    );
    store.dispatch(
      ProductsActions({
        page: Number(params.page ?? 1),
        limit: Number(params.limit ?? 10),
      })
    );
    return null;
  };
