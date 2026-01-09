import { useAppSelector } from "@/config/hooks";
import { ProductSelector } from "@/modules/products/slice/ProductSelector";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useQueryPagination } from "@/shared/hooks/useQueryPagination";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const allProducts = useAppSelector(ProductSelector.SelectAllProducts);
  const loadingProducts = useAppSelector(ProductSelector.getLoadingState);
  const totalItems = useAppSelector(ProductSelector.getTotalItems);

  const queryPagination = useQueryPagination({
    total: totalItems,
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("productSearchTerm") || "";
  });
  const debounceSearch = useDebounce(searchTerm, 800);

  useEffect(() => {
    queryPagination.updateQueryParams({
      search: debounceSearch,
      page: "1",
    });
  }, [debounceSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem("productSearchTerm", value);
  };

  return {
    allProducts,
    loadingProducts,
    queryPagination,
    searchTerm,
    handleSearch,
  };
};

export type UseProductsBehavoir = ReturnType<typeof useProducts>;
