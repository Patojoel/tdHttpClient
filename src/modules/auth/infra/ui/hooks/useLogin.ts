import { useAppDispatch, useAppSelector } from "@/config/hooks";
import { AuthSelector } from "@/modules/auth/slice/AuthSelector";
import { LoginAsync } from "@/modules/auth/use-case/login/LoginAsync";
import { ProductRoutes } from "@/routes/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(AuthSelector.getUser);
  const loading = useAppSelector(AuthSelector.getLoginLoading);
  const error = useAppSelector(AuthSelector.getError);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate(ProductRoutes.list, { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warn("Veuillez remplir tous les champs");
      return;
    }
    dispatch(LoginAsync({ username, password }));
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};

export type UseLoginBehavior = ReturnType<typeof useLogin>;
