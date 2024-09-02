'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RoomParticipant {
  user: {
    leetCodeUsername: string | null;
    image: string | null;
  };
  stats: {
    easyQuestionsSolved: number;
    mediumQuestionsSolved: number;
    hardQuestionsSolved: number;
    contestRating: number;
    globalRanking: number;
    attendedContests: number;
    lastUpdated: string;
  } | null;
}

const columns: ColumnDef<RoomParticipant>[] = [
  {
    accessorKey: 'user.leetCodeUsername',
    header: 'Username',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.user.image || ''} />
          {/* console.log(row.original.user.image) */}
          <AvatarFallback className="text-black">
            {row.original.user.leetCodeUsername?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span>{row.original.user.leetCodeUsername}</span>
      </div>
    ),
  },
  {
    accessorKey: 'stats.easyQuestionsSolved',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Easy</span>
          <span className="sm:hidden">EZ</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.easyQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: 'stats.mediumQuestionsSolved',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Medium</span>
          <span className="sm:hidden">MD</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.mediumQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: 'stats.hardQuestionsSolved',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Hard</span>
          <span className="sm:hidden">HD</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.original.stats?.hardQuestionsSolved || 0}</div>
    ),
  },
  {
    accessorKey: 'stats.contestRating',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Rating</span>
          <span className="sm:hidden">RT</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.stats?.contestRating || 'N/A'}</div>,
  },
  {
    accessorKey: 'stats.globalRanking',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Ranking</span>
          <span className="sm:hidden">RN</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.stats?.globalRanking || 'N/A'}</div>,
  },
  {
    accessorKey: 'stats.attendedContests',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          className="whitespace-nowrap"
        >
          <span className="hidden sm:inline">Contests</span>
          <span className="sm:hidden">CN</span>
          {isSorted === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : isSorted === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.stats?.attendedContests || 0}</div>,
  },
];

export function DataTable({ data }: { data: RoomParticipant[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
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
    <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <Table className="border border-black text-sm md:text-lg">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-white text-center"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="text-white"
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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
      </div>
    </div>
  );
}
