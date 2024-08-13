"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

interface RoomParticipant {
  user: {
    leetCodeUsername: string | null;
  };
  stats: {
    easyQuestionsSolved: number;
    mediumQuestionsSolved: number;
    hardQuestionsSolved: number;
    contestRating: number;
    globalRanking: number;
    attendedContests: number;
  } | null;
}

const columns: ColumnDef<RoomParticipant>[] = [
  {
    accessorKey: "user.leetCodeUsername",
    header: "Username",
    cell: ({ row }) => <div>{row.original.user.leetCodeUsername}</div>,
  },
  {
    accessorKey: "stats.easyQuestionsSolved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Easy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.easyQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: "stats.mediumQuestionsSolved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Medium
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.mediumQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: "stats.hardQuestionsSolved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Hard
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.hardQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: "stats.contestRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.stats?.contestRating || "N/A"}</div>,
  },
  {
    accessorKey: "stats.globalRanking",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ranking
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.stats?.globalRanking || "N/A"}</div>,
  },
  {
    accessorKey: "stats.attendedContests",
    header: "Contests",
    cell: ({ row }) => <div>{row.original.stats?.attendedContests || 0}</div>,
  },
];

export function DataTable({ data }: { data: RoomParticipant[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="overflow-x-auto">
      {/* <div> */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter usernames..."
          value={
            (table
              .getColumn("user.leetCodeUsername")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("user.leetCodeUsername")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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
                  data-state={row.getIsSelected() && "selected"}>
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
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
