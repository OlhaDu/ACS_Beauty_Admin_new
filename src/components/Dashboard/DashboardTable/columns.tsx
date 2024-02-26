import moment from "moment"
import { GridColDef } from "@mui/x-data-grid"
import s from "./DashboardTable.module.scss"

const statusColors: { [key: string]: string } = {
  Hoве: s.new_status,
  Прийнято: s.accepted_status,
  Оплачено: s.paid_status,
  Виконано: s.paid_status,
  Скасовано: s.cancelled_status,
}

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
    field: "status",
    headerName: "Статус",
    width: 120,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => {
      const status = params.value as string
      const className = statusColors[status] || s.new_status
      return <div className={className}>{status}</div>
    },
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
