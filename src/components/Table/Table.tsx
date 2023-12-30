import styles from "./Table.module.scss";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Column {
  field: string;
  headerName: string;
  type?: string;
  width: number;
}

interface Row {
  [key: string]: number | string;
}

interface DataTableProps {
  columns: Column[];
  rows: Row[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const tableColumns: GridColDef[] = columns.map((column) => ({
    field: column.field,
    headerName: column.headerName,
    type: column.type,
    width: column.width,
  }));

  // const tableRows = rows.map((row) =>
  //   columns.map((column) => ({
  //     [column.field]: row[column.field],
  //   }))
  // );

  const tableRows = rows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
