import { useAppDispatch } from "@/config/hooks";
import { logout } from "@/modules/auth/slice/AuthSlice";
import { AuthRoutes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Déconnexion réussie");
    navigate(AuthRoutes.login, { replace: true });
  };

  return {
    handleLogout,
  };
};
