import { useProducts } from "./hooks/useProducts";
import { Plus, LogOut, User } from "lucide-react";
import { Button } from "@/component/ui/button";
import { ProductTable } from "./components/ProductTable";
import { InputSearch } from "@/gererics/inputs/InputSearch";
import { useAppSelector } from "@/config/hooks";
import { AuthSelector } from "@/modules/auth/slice/AuthSelector";
import { useLogout } from "@/modules/auth/infra/ui/hooks/useLogout";

export const ViewProductsList = () => {
  const behavior = useProducts();
  const user = useAppSelector(AuthSelector.getUser);
  const { handleLogout } = useLogout();

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50/50 p-8 space-y-6 overflow-hidden">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Catalogue Produits
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Gérez votre inventaire et vos ventes en temps réel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm bg-indigo-50 flex items-center justify-center">
                {user.image ? (
                  <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-indigo-400" />
                )}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                   {user.username}
                </div>
              </div>
            </div>
          )}

          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all shadow-md shadow-indigo-100"
          >
            <Plus size={18} />
            <span className="hidden md:inline">Nouveau Produit</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl p-2.5 transition-all"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <InputSearch
          value={behavior.searchTerm}
          onChange={(e) => behavior.handleSearch(e.target.value)}
          placeholder="Rechercher un produit ..."
          defaultValue={behavior.searchTerm}
        />
      </div>

      <ProductTable behavior={behavior} />
    </div>
  );
};

export default ViewProductsList;
