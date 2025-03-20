"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import VirtualTable from "../components/VirtualTable";
import { makeData, Person } from "./makeData";

function App() {
  // Generate data once and store it in state to maintain consistency
  const [data] = React.useState(() => makeData(100000));
  
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        cell: (info) => info.getValue(),
        footer: () => "Total",
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 100,
        aggregationFn: "count",
        aggregatedCell: ({ getValue }) => `${getValue<number>()} people`,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        cell: (info) => info.getValue(),
        footer: () => "",
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 100,
        aggregationFn: "count",
        aggregatedCell: ({ getValue }) => `${getValue<number>()} people`,
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: (info) => info.getValue(),
        aggregatedCell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100} (avg)`,
        aggregationFn: "mean",
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("age") as number);
          const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}`;
        },
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 80,
      },
      {
        accessorKey: "visits",
        header: "Visits",
        cell: (info) => info.getValue(),
        aggregationFn: "sum",
        aggregatedCell: ({ getValue }) => `${getValue<number>()} (total)`,
        footer: props => {
          const total = props.table.getFilteredRowModel().rows.reduce<number>(
            (sum, row) => sum + (row.getValue("visits") as number),
            0
          );
          return `Total: ${total}`;
        },
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 80,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
        aggregationFn: "count",
        aggregatedCell: ({ getValue, row }) => {
          const count = getValue<number>();
          const status = row.getValue("status");
          return `${status}: ${count} items`;
        },
        footer: props => {
          const rows = props.table.getFilteredRowModel().rows;
          const statusCounts = new Map<string, number>();
          
          for (const row of rows) {
            const status = row.getValue("status") as string;
            statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
          }
          
          return Array.from(statusCounts.entries())
            .map(([status, count]) => `${status}: ${count}`)
            .join(", ");
        },
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 150,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        cell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}%`,
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}% (avg)`,
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("progress") as number);
          const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}%`;
        },
        enableSorting: true,
        enableResizing: true,
        enableGrouping: true,
        minSize: 100,
      },
    ],
    []
  );

  // Store initial state in state to maintain consistency
  const [initialState] = React.useState({
    grouping: ["status"],
    sorting: [{ id: "lastName", desc: false }],
    expanded: {},
    columnSizing: {},
    columnFilters: [],
  });

  return (
    <VirtualTable
      data={data}
      columns={columns}
      initialState={initialState}
      groupDisplayType="groupRows"
      groupDefaultExpanded={1}
      showOpenedGroup={true}
      groupHideOpenParents={false}
    />
  );
}

export default App;
