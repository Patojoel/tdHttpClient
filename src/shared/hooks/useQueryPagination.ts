import {useEffect, useState} from "react";

export interface QueryPaginationBehavior {
  page: number;
  limit: number;
  handleQueryPagination: (value: string) => void;
  handleChangedPage: (value: number) => void;
  handleChangedLimit: (value: number) => void;
  handleQueryPaginationData: (page: number, limit: number) => void;
  total: number;
}

interface OwnProps {
  initialLimit?: number;
  initialPage?: number;
  callback?: (page: number, limit: number) => void,
  total?: number;
}

export const useQueryPagination = (
  {
    initialLimit, initialPage,
    callback, total,
  }: OwnProps = {
    initialPage: 1,
    initialLimit: 20,
    total: 0,
  }): QueryPaginationBehavior => {
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [limit, setLimit] = useState(initialLimit || 20);

  const handleQueryPagination = (value: string) => {
    const paginatorParams = value.split("/");
    const l = parseInt(paginatorParams[0]);
    const p = parseInt(paginatorParams[1]);
    if (p === page && l === limit) return;
    callback?.(p, l);
    setLimit(l);
    setPage(p);
  };

  const handleQueryPaginationData = (p: number, l: number) => {
    if (p === page && l === limit) return;
    callback?.(p, l);
    setLimit(l);
    setPage(p);
  }

  useEffect(() => {
    if(!!initialPage) setPage(initialPage);
    if(!!initialLimit) setLimit(initialLimit);
  }, [initialLimit, initialPage]);

  return {
    limit,
    page,
    handleQueryPagination,
    handleChangedPage: setPage,
    handleChangedLimit: setLimit,
    handleQueryPaginationData,
    total: total || 0,
  }
}
