import { LoaderFunction, redirect } from "react-router-dom";
import { AppStore } from "@/config/create-store";
import { ProductRoutes } from "@/routes/routes";

export const AuthLoader =
  (store: AppStore): LoaderFunction =>
  () => {
    const user = store.getState().authReducer.user;
    if (user) {
      return redirect(ProductRoutes.list);
    }
    return null;
  };
