"use client";
import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";
import { Pagination } from "./Pagination";

export interface DataTablePaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onChanged: (page: number, limit: number) => void;
  isLoading?: boolean;
}

function DraggableRow<T extends { id: string | number }>({
  row,
}: {
  row: Row<T>;
}) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableCell key={cell.id + index}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable<T extends { id: string | number }>({
  data: initialData,
  columns,
  pagination: externalPagination,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: DataTablePaginationProps;
}) {
  const data = initialData;
  // const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: externalPagination
        ? {
            pageIndex: externalPagination.currentPage - 1,
            pageSize: externalPagination.itemsPerPage,
          }
        : pagination,
    },
    getRowId: (row) => row.id.toString(),
    manualPagination: !!externalPagination,
    pageCount: externalPagination
      ? Math.ceil(
          externalPagination.totalItems / externalPagination.itemsPerPage
        )
      : undefined,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <Table>
        <TableHeader className="bg-muted  sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={"border-b border-[#C2C8D0]"}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalItems={table.getRowCount()}
        itemsPerPage={table.getState().pagination.pageSize}
        onChanged={(page, limit) => {
          table.setPageIndex(page - 1);
          table.setPageSize(limit);
        }}
      />
    </>
  );
}
