import React from "react"
import s from "./ExportButton.module.scss"
import ExportFileIcon from "../../../images/svg/ExportFileIcon.jsx"
import * as XLSX from "xlsx"
import { OrdersColumn, OrdersRow } from "../../../types/IOrders.ts"
import { IUser } from "../../../types/IUsers.ts"

interface Props {
  columns: OrdersColumn[]
  rows: OrdersRow[] | IUser[]
}

const ExportButton: React.FC<Props> = ({ columns, rows }) => {
  const onClick = () => {
    const ws = XLSX.utils.json_to_sheet(
      [columns.map(col => col.headerName), ...rows.map(row => columns.map(col => row[col.field]))],
      { skipHeader: true }
    )

    const colWidths = columns.map(col => {
      const maxContentLength = Math.max(
        col.headerName.length,
        ...rows.map(row => String(row[col.field]).length)
      )
      return { wch: maxContentLength + 2 }
    })
    ws["!cols"] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

    XLSX.writeFile(wb, "exported_data.xlsx")
  }

  return (
    <button className={s.container} onClick={onClick}>
      <div className={s.fieldContainer}>
        <div className={s.icon}>
          <ExportFileIcon />
        </div>
        <div>Експортувати</div>
      </div>
    </button>
  )
}

export default ExportButton
