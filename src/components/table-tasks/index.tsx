/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterStatus } from "../filter-status";
import { Loader2, PencilIcon, Trash2Icon } from "lucide-react";

export type StatusEnum = "Concluída" | "Em Andamento" | "Pendente";

export type Tasks = {
  id: string;
  title: string;
  status: "Concluída" | "Em Andamento" | "Pendente";
  description: string;
};

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("status")}</div>
    ),
  },
  {
    id: "edit",
    header: () => <div className="text-center">Edit</div>,
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex justify-center cursor-pointer">
          <PencilIcon size={18} />
        </div>
      );
    },
  },
  {
    id: "delete",
    header: () => <div className="text-center">Delete</div>,
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex justify-center cursor-pointer">
          <Trash2Icon size={18} />
        </div>
      );
    },
  },
];

export function TableTasks({
  data,
  canNextPage,
  canPrevPage,
  handleNextPage,
  handlePrevPage,
  page,
  filterName,
  handleChangeFilterName,
  handleChangeStatus,
  isLoading,
}: {
  data: Tasks[];
  canNextPage: boolean;
  canPrevPage: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  page: number;
  filterName?: string;
  handleChangeFilterName: (name: string) => void;
  handleChangeStatus: (status: StatusEnum) => void;
  isLoading: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          value={filterName}
          onChange={(ev) => {
            handleChangeFilterName(ev.target.value);
          }}
          placeholder="Filter tasks..."
          className="max-w-sm"
        />
        <FilterStatus handleChangeStatus={handleChangeStatus} />
      </div>
      {!isLoading ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={!canPrevPage}
              >
                Previous
              </Button>
              <Button variant={"ghost"} className="font-bold text-lg">
                {page}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!canNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="animate-spin" size={32} />
        </div>
      )}
    </div>
  );
}
