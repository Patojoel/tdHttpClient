import { useProducts } from "./hooks/useProducts";
import { Plus } from "lucide-react";
import { Button } from "@/component/ui/button";
import { ProductTable } from "./components/ProductTable";
import { InputSearch } from "@/gererics/inputs/InputSearch";
export const ViewProductsList = () => {
  const behavior = useProducts();

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50/50 p-8 space-y-6 overflow-hidden">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Catalogue Produits
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Gérez votre inventaire et vos ventes en temps réel
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all shadow-md shadow-indigo-100">
          <Plus size={18} />
          Nouveau Produit
        </Button>
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
