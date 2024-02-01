import s from "./Table.module.scss"

import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"

import { OrdersColumn, OrdersRow } from "../../types/IOrders.ts"
import "/src/styles/variables.scss"
import { IUser } from "../../types/IUsers.ts"

interface Props {
  columns: OrdersColumn[]
  rows: OrdersRow[] | IUser[]
}

const Table: React.FC<Props> = ({ columns, rows }) => {
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
      />
    </div>
  )
}

export default Table
