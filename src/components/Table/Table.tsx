import s from "./Table.module.scss"

import * as React from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import DeleteIcon from "../../images/svg/DeleteIcon.tsx"
import EditIcon from "../../images/svg/EditIcon.tsx"
import { OrdersColumn, OrdersRow } from "../../types/IOrders.ts"

interface Props {
  columns: OrdersColumn[]
  rows: OrdersRow[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const Table: React.FC<Props> = ({ columns, rows, onEdit, onDelete }) => {
  const columnsWithActions: GridColDef[] = [
    ...columns,
    {
      field: "actions",
      headerName: "ДіЇ",
      width: 100,
      renderCell: params => (
        <div className={s.actionButtons}>
          <button onClick={() => onEdit(params.row.id as number)}>
            <EditIcon className={s.svg} />
          </button>
          <button onClick={() => onDelete(params.row.id as number)}>
            <DeleteIcon className={s.svg} />
          </button>
        </div>
      ),
      headerClassName: s.headerCell,
    },
  ]

  columnsWithActions.forEach(column => {
    column.headerClassName = s.headerCell
  })

  return (
    <div className={s.table}>
      <DataGrid
        rows={rows}
        columns={columnsWithActions}
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
