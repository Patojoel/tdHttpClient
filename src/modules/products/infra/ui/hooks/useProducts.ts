import { useAppDispatch, useAppSelector } from "@/config/hooks";
import { ProductsActions } from "@/modules/products/actions/GetProductsActions";
import { ProductSelector } from "@/modules/products/slice/ProductSelector";
import { useQueryPagination } from "@/shared/hooks/useQueryPagination";
import { LoadingState } from "@/shared/domain/enums/LoadingState";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const allProducts = useAppSelector(ProductSelector.SelectAllProducts);
  const loadingProducts = useAppSelector(ProductSelector.getLoadingState);
  const totalItems = useAppSelector(ProductSelector.getTotalItems);
  const getProductCommand = useAppSelector(ProductSelector.getProductCommand);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const handleQueryPaginate = (page: number, limit: number) => {
    const oldQuery = Object.fromEntries(searchParams);

    setSearchParams({
      ...oldQuery,
      page: page.toString(),
      limit: limit.toString(),
    });
    dispatch(ProductsActions({ page, limit }));
  };
  const queryPagination = useQueryPagination({
    initialLimit: getProductCommand?.limit,
    initialPage: getProductCommand?.page,
    total: totalItems,
    callback: handleQueryPaginate,
  });
  console.log(queryPagination);

  return { allProducts, loadingProducts, queryPagination };
};

export type UseProductsBehavoir = ReturnType<typeof useProducts>;
