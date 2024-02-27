import moment from "moment"
import noImage from "src/images/photo/no_image.png"
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    // field: "id",
    field: "№",
    headerName: "№",
    width: 60,
    type: "number",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "desktopBanner",
    headerName: "Банер сайт",
    width: 242,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => (
      <img
        src={(params.value as string) || noImage}
        alt="banner"
        style={{ width: "179px", height: "97px", objectFit: "contain" }}
      />
    ),
    editable: true,
  },
  {
    field: "mobileBanner",
    headerName: "Банер мобільний",
    width: 205,
    type: "string",
    align: "center",
    headerAlign: "center",
    renderCell: params => (
      <img
        src={(params.value as string) || noImage}
        alt="banner"
        style={{ width: "107px", height: "84px", objectFit: "contain" }}
      />
    ),
    editable: true,
  },
  {
    field: "priority",
    headerName: "Пріорітет",
    width: 192,
    type: "string",
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
