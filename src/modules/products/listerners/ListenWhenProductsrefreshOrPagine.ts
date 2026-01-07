import { startAppListening } from "@/config/create-app-listener-middleware";
import { ProductsActions } from "../actions/GetProductsActions";
import { GetAllProductsAsync } from "../use-case/get-all-products/GetAllProductsAsync";

export const listenWhenProductsRefreshOrPagine = () =>
  startAppListening({
    actionCreator: ProductsActions,
    effect: async (action, { dispatch }) => {
      const { limit, page } = action.payload;

      dispatch(GetAllProductsAsync({ limit, page }));
    },
  });
