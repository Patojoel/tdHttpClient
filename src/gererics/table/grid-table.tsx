"use client";
import * as React from "react";
import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Pagination} from "@/components/generics/table/pagination.tsx";
import {twMerge} from "tailwind-merge";
import type {PaginationData} from "@/shared/interfaces/PaginationData.ts";

export function GridTable<T extends { id: string }>({
  data: initialData,
  children,
  className,
  defaultSize = 6,
  defaultIndex = 0,
}: {
  children: (t: T, pagination: PaginationData) => React.ReactNode;
  data: T[];
  defaultSize?: number;
  defaultIndex?: number;
  className?: string;
}) {
    const [pagination, setPagination] = React.useState({
        pageIndex: defaultIndex,
        pageSize: defaultSize,
    });

  const table = useReactTable({
    data: initialData,
    columns: [],
    state: {
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const data = initialData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

    return (
        <>
            <div
                className={twMerge(
                    "overflow-x-auto minScrollBarCao  ",
                    "grid grid-cols-2 xl:grid-cols-3 gap-4 px-4! py-[14px] items-center " +
                    "min-h-[60px] border border-border",
                    className
                )}
            >
                {data.map((studentClass) => {
                    return (
                        <React.Fragment key={studentClass.id}>
                            {children(studentClass, pagination)}
                        </React.Fragment>
                    );
                })}
            </div>
            <Pagination
                currentPage={table.getState().pagination.pageIndex + 1}
                pageSize={table.getState().pagination.pageSize}
                totalPages={table.getPageCount()}
                setPageIndex={table.setPageIndex}
                setPageSize={table.setPageSize}
                getRowCount={table.getRowCount}
                getCanPreviousPage={table.getCanPreviousPage}
                getCanNextPage={table.getCanNextPage}
                nextPage={table.nextPage}
                paginations={[6, 12, 25, 50]}
                className={"py-2"}
            />
        </>
    );
}
