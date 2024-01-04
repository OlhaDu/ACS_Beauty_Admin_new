import s from "./Table.module.scss";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

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
  return (
    <div className={s.table}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
