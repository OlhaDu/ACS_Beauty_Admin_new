import React from "react"
import s from "./ExportButton.module.scss"
import { useSelector } from "react-redux"
import { selectColumns } from "src/redux/reviews/selectors"
import { columns } from "../ReviewsItems/columns"
import * as XLSX from "xlsx"

const ExportButton = () => {
  const reviews = useSelector(selectColumns)
  const onClick = () => {
    const ws = XLSX.utils.json_to_sheet(
      [
        columns.map(col => col.headerName),
        ...reviews.map(review => columns.map(col => review[col.field])),
      ],
      { skipHeader: true }
    )

    const colWidths = columns.map(col => {
      const headerNameLength = col.headerName ? col.headerName.length : 0
      const maxContentLength = Math.max(
        headerNameLength,
        ...reviews.map(review => String(review[col.field]).length)
      )
      return { wch: maxContentLength + 2 }
    })
    ws["!cols"] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

    XLSX.writeFile(wb, "exported_data.xlsx")
  }
  
  return (
    <button type="button" className={s.btnExport} onClick={onClick}>
      ЕКСПОРТУВАТИ
    </button>
  )
}
export default ExportButton
