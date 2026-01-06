import { createBrowserRouter, Navigate } from "react-router-dom";
import type { AppStore } from "../config/create-store";
import { ProductRoutes } from "./routes";
import { ViewProductsList } from "../modules/products/infra/ui/ViewProductsList";
import { GetAllProductLoader } from "../modules/products/infra/ui/loader/GetAllProductLoader";

export const createRouter = ({ store }: { store: AppStore }) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={ProductRoutes.list} replace={true} />,
    },
    {
      path: ProductRoutes.list,
      element: <ViewProductsList />,
      loader: GetAllProductLoader(store),
    },
  ]);
};

export type AppRouter = ReturnType<typeof createRouter>;
