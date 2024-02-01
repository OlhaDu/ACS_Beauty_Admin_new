import s from "./Table.module.scss"

import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"

import { OrdersColumn, OrdersRow } from "../../types/IOrders.ts"
import "/src/styles/variables.scss"
import { IUser } from "../../types/IUsers.ts"

interface Props {
  columns: OrdersColumn[]
  rows: OrdersRow[] | IUser[]
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  count: number
}

const Table: React.FC<Props> = ({ columns, rows, page, pageSize, setPage, setPageSize, count }) => {
  return (
    <div className={s.table}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick={true}
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
      />
    </div>
  )
}

export default Table
