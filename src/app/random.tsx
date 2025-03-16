"use client";

import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ColDef,
  ClientSideRowModelModule,
  ValidationModule,
} from "ag-grid-community";
import { RowGroupingModule, LicenseManager } from "ag-grid-enterprise";

import { IOlympicData } from "./interfaces";
ModuleRegistry.registerModules([
  RowGroupingModule,
  ValidationModule,
  ClientSideRowModelModule,
]);

LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE || "");

export default function Home() {
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);
  const [columnDefs] = useState<ColDef[]>([
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete" },
    { field: "sport" },
    { field: "total" },
  ]);

  const onGridReady = useCallback(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  const [defaultColDef] = useState({
    flex: 1,
  });

  const [statusBar] = useState({
    statusPanels: [
      {
        statusPanel: "agTotalAndFilteredRowCountComponent",
        align: "left",
      },
    ],
  });

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          statusBar={statusBar}
          onGridReady={onGridReady}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={"multipleColumns"}
        />
      </div>
    </>
  );
}
