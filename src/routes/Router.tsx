import { createBrowserRouter, Navigate } from "react-router-dom";
import type { AppStore } from "../config/create-store";
import { AuthRoutes, ProductRoutes } from "./routes";
import { ViewProductsList } from "../modules/products/infra/ui/ViewProductsList";
import { GetAllProductLoader } from "../modules/products/infra/ui/loader/GetAllProductLoader";
import { ViewLogin } from "../modules/auth/infra/ui/ViewLogin";
import { Guard } from "./Guard";
import { AuthLoader } from "../modules/auth/infra/ui/loader/AuthLoader";

export const createRouter = ({ store }: { store: AppStore }) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={ProductRoutes.list} replace={true} />,
    },
    {
      path: AuthRoutes.login,
      element: <ViewLogin />,
      loader: AuthLoader(store),
    },
    {
      path: ProductRoutes.list,
      element: (
        <Guard>
          <ViewProductsList />
        </Guard>
      ),
      loader: GetAllProductLoader(store),
    },
  ]);
};

export type AppRouter = ReturnType<typeof createRouter>;
