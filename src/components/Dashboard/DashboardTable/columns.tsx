import moment from "moment"
import { GridColDef } from "@mui/x-data-grid"
import s from "./DashboardTable.module.scss"

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "№",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "customer",
    headerName: "Клієнт",
    width: 130,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => {
      const value = params.value as string
      return <div className={s.ableCell}>{value}</div>
    },
  },
  {
    field: "total",
    headerName: "Сума",
    width: 100,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "deliveryMethod",
    headerName: "Спосіб доставки",
    width: 140,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "waybill",
    headerName: "ТТН",
    width: 140,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "comments",
    headerName: "Коментар",
    width: 180,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => {
      const value = params.value as string
      return <div className={s.ableCell}>{value}</div>
    },
  },
  {
    field: "additionDate",
    headerName: "Створено",
    type: "string",
    width: 102,
    editable: true,
    valueGetter: params => moment(params.row.createdAt).format("DD.MM.YYYY"),
  },
]
