import moment from "moment"
import noImage from "src/images/photo/no_image.png"
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "№",
    width: 60,
    type: "number",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "logo",
    headerName: "Логотип",
    width: 178,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => (
      <img
        src={(params.value as string) || noImage}
        alt="Logo"
        style={{ width: "138px", height: "97px", objectFit: "contain" }}
      />
    ),
    editable: true,
  },
  {
    field: "name",
    headerName: "Назва",
    width: 122,
    type: "string",
    editable: true,
  },
  {
    field: "description",
    headerName: "Опис",
    type: "string",
    width: 500,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Додано",
    type: "string",
    width: 102,
    editable: true,
    valueGetter: params => moment(params.row.createdAt).format("DD.MM.YYYY"),
  },
]
