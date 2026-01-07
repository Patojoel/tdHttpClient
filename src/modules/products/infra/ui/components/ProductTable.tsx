import { Pagination } from "@/gererics/table/Pagination";
import { Eye, ShoppingCart, Trash2 } from "lucide-react";
import { UseProductsBehavoir } from "../hooks/useProducts";
import { LoadingState } from "@/shared/domain/enums/LoadingState";

interface ProductTableProps {
  behavior: UseProductsBehavoir;
}

export const ProductTable = ({ behavior }: ProductTableProps) => {
  const { allProducts, loadingProducts, queryPagination } = behavior;

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="overflow-auto flex-1 pr-2 custom-scrollbar">
        <table className="table-auto w-full border-separate border-spacing-y-3 pt-2">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="text-left pl-6 pb-2 w-[40%]">
                Détails du produit
              </th>
              <th className="text-left pb-2 w-[20%]">Catégorie</th>
              <th className="text-left pb-2 w-[15%]">Prix Unitaire</th>
              <th className="text-center pb-2 w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingProducts === "pending" ? (
              <tr>
                <td colSpan={4} className="py-32">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">
                      Récupération des données...
                    </p>
                  </div>
                </td>
              </tr>
            ) : !allProducts.length ? (
              <tr>
                <td colSpan={4} className="py-32 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-4 bg-slate-100 rounded-full text-slate-300">
                      <ShoppingCart size={40} />
                    </div>
                    <p className="text-slate-500 font-semibold text-lg">
                      Aucun produit trouvé
                    </p>
                    <p className="text-slate-400 text-sm">
                      Essayez de modifier vos filtres ou d'ajouter un produit.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              allProducts.map((product) => (
                <tr
                  key={product.id}
                  className="group bg-white hover:bg-slate-50/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-transparent hover:border-slate-200"
                >
                  <td className="py-5 pl-6 rounded-l-[18px] border-y border-l border-slate-100/50 group-hover:border-slate-200/50">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100"
                        />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-[15px] group-hover:text-indigo-600 transition-colors">
                          {product.title}
                        </span>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">
                          ID: #{product.id.toString().slice(-4)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 border-y border-slate-100/50 group-hover:border-slate-200/50">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold uppercase tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-5 border-y border-slate-100/50 group-hover:border-slate-200/50">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-black text-slate-900">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-slate-400 self-end mb-1">
                        FCFA
                      </span>
                    </div>
                  </td>
                  <td className="py-5 rounded-r-[18px] border-y border-r border-slate-100/50 group-hover:border-slate-200/50 text-center">
                    <div className="flex justify-center items-center gap-1 px-4">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all hover:shadow-sm">
                        <Eye size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-white rounded-xl transition-all hover:shadow-sm">
                        <ShoppingCart size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all hover:shadow-sm">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

        <Pagination
          itemsPerPage={queryPagination.limit}
          currentPage={queryPagination.page}
          onChanged={queryPagination.handleQueryPaginationData}
          totalItems={queryPagination.total}
        />

    </div>
  );
};
