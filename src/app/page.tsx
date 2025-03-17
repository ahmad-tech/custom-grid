"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import VirtualTable from "../components/VirtualTable";
import { makeData, Person } from "./makeData";

function App() {
  const data = React.useMemo(() => makeData(100000), []);
  
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
        cell: (info) => info.getValue(),
        footer: () => "Total",
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        header: () => <span>Last Name</span>,
        cell: (info) => info.getValue(),
        footer: () => "",
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: "median",
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("age") as number);
          const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 80,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        aggregationFn: "sum",
        aggregatedCell: ({ getValue }) => getValue<number>(),
        footer: props => {
          const total = props.table.getFilteredRowModel().rows.reduce<number>(
            (sum, row) => sum + (row.getValue("visits") as number),
            0
          );
          return `Total: ${total}`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 80,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: props => {
          const statuses = props.table.getFilteredRowModel().rows.map(row => row.getValue("status"));
          const uniqueStatuses = new Set(statuses);
          return `${uniqueStatuses.size} statuses`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        cell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}%`,
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}%`,
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("progress") as number);
          const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}%`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
      },
    ],
    []
  );

  return (
    <VirtualTable
      data={data}
      columns={columns}
      initialState={{
        grouping: [],
        sorting: [],
        expanded: {},
        columnSizing: {},
        columnFilters: [],
      }}
    />
  );
}

export default App;
