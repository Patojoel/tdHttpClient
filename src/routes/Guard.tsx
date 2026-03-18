import { useAppSelector } from "@/config/hooks";
import { AuthSelector } from "@/modules/auth/slice/AuthSelector";
import { Navigate } from "react-router-dom";
import { AuthRoutes } from "./routes";

export const Guard = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(AuthSelector.getUser);

  if (!user) {
    return <Navigate to={AuthRoutes.login} replace={true} />;
  }

  return <>{children}</>;
};
