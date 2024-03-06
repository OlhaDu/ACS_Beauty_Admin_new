import moment from "moment"
import { GridColDef } from "@mui/x-data-grid"
import StarIcon from "src/images/svg/StarIcon"

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 60,
    type: "number",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "productName",
    headerName: "Назва товару",
    width: 180,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "author",
    headerName: "Автор",
    width: 180,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "review",
    headerName: "Відгук",
    width: 200,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "rating",
    headerName: "Рейтинг",
    width: 130,
    type: "string",
    renderCell: params => (
      <>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <StarIcon key={index} fill={index < params.value ? "black" : "white"} />
          ))}
      </>
    ),
    align: "center",
    headerAlign: "center",
  },
  {
    field: "formData",
    headerName: "Створено",
    type: "string",
    width: 112,
    editable: true,
    valueGetter: params => moment(params.row.createdAt).format("DD.MM.YYYY"),
  },
  
]
