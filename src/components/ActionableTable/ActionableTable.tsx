import Box from "@mui/material/Box"
import React, { ReactNode } from "react"
import { GridRowId, DataGrid, GridColDef } from "@mui/x-data-grid"

import { INovelty } from "src/types/news"
import { IBrand } from "src/types/brands"

interface IProps {
  columns: GridColDef[]
  rows: INovelty[] | IBrand[]
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  count: number
  getActions: (id: GridRowId) => ReactNode[]
}

const ActionableTable: React.FC<IProps> = ({
  columns,
  rows,
  page,
  pageSize,
  setPage,
  setPageSize,
  count,
  getActions,
}) => {
  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 100,
    cellClassName: "actions",

    getActions: ({ id }) =>
      getActions(id).map(action => <React.Fragment key={id}>{action}</React.Fragment>),
  }

  const tableColumns: GridColDef[] = columns.map(col =>
    col.field === "text" || col.field === "description"
      ? {
          ...col,
          renderCell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
        }
      : col
  )

  tableColumns.push(actionsColumn)

  return (
    <Box
      sx={{
        ".actions": {
          color: "text.secondary",
        },
        ".textPrimary": {
          color: "text.primary",
        },
        ".MuiDataGrid-columnHeaders": {
          backgroundColor: "#F8F0FB",
        },
        ".MuiDataGrid-cell:focus": {
          outline: "none !important",
        },
        ".MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={tableColumns}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        disableColumnMenu={true}
        isCellEditable={() => false}
        isRowSelectable={() => false}
        rowCount={count}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page)
          setPageSize(pageSize)
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        columnHeaderHeight={44}
        rowHeight={107}
      />
    </Box>
  )
}

export default ActionableTable
