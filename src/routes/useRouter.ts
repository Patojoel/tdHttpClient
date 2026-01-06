import {useLocation, useNavigate, Outlet} from "react-router-dom";
import type {To} from "react-router-dom";

interface NavigationProps {
  replace?: boolean;
  native?: boolean;
  newTab?: boolean;
  state?: any;
}

export type useRouterBehavior = ReturnType<typeof useRouter>;

export const useRouter = () => {
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const clearHistory = () => {
    // Remplace l'état actuel sans ajouter d'entrée
    window.history.replaceState(null, '', window.location.pathname);

    // Alternative plus radicale (attention, peut affecter l'UX)
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', (e) => {
      window.history.pushState(null, '', window.location.pathname);
    });
  };

  const handleNavigate = (url: string | number, props?: NavigationProps) => {
    if (props?.native && props?.replace) {
      window.location.replace(url.toString());
      clearHistory();
      return;
    }
    if (props?.native) {
      window.open(url.toString(), props?.newTab ? '_blank' : '_self');
      return;
    }
    
    navigate(url as To, {
      replace: props?.replace,
      state: props?.state,
    });
  };

  const handleBackToPreviousPage = () => {
    navigate(-1);
  };

  const isActiveRoute = (url: string) => {
    return location.pathname === url;
  };

  return {
    handleNavigate,
    handleBackToPreviousPage,
    isActiveRoute,
    Outlet,
    pathname: decodeURIComponent(location.pathname),
    search: location.search,
    fullPathName: location.pathname + location.search,
    state: location.state ?? {},
    navigate,
    params,
  };
};
