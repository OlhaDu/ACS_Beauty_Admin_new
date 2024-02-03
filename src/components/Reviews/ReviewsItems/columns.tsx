import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import StarIcon from "src/images/svg/StarIcon"



export const columns: GridColDef[] = [
    {
        field: "id",
    headerName: "id",
    width: 40,
    type: "number",
    align: "center",
    headerAlign: "center",
    },
    {
        field: "productName",
        headerName: "Назва товару",
        width: 140,
        type: "string",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "author",
        headerName: "Автор",
        width: 160,
        type: "string",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "review",
        headerName: "Відгук",
        width: 160,
        type: "string",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "rating",
        headerName: "Рейтинг",
        width: 105,
        type: "string",
        renderCell: (params) => (
            <>
              {Array(4).fill(0).map((_, index) => (
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
    width: 102,
    editable: true,
    valueGetter: (params) => moment(params.row.createdAt).format("DD.MM.YYYY"),
    },
    {
        field: "status",
        headerName: "Статус",
        width: 100,
        type: "string",
        align: "center",
        headerAlign: "center",
    },
   
]
