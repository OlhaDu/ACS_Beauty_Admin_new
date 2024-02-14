import { useSelector } from "react-redux"
import Switch from "@mui/material/Switch"
import { columns } from "./columns"
import { useAppDispatch } from "src/redux/store"
import { selectReviews, selectCount } from "src/redux/reviews/selectors"
import { deleteReview, patchReviews } from "src/redux/reviews/operations"
import Box from "@mui/material/Box"
import DeleteIcon from "src/images/svg/DeleteIconTS"
import { DataGrid, GridColDef, GridActionsCellItem, GridValueGetterParams } from "@mui/x-data-grid"
import { Typography } from "@mui/material"
interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const ReviewsTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const reviews = useSelector(selectReviews)
  const count = useSelector(selectCount)

  const handleStatusChange = (id: number, newStatus: "published" | "pending") => {
    const status = { status: newStatus }
    dispatch(patchReviews({ id, status }))
  }

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 110,
    cellClassName: "actions",

    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<DeleteIcon fill={"black"} width={53} height={53} />}
          label="Delete"
          color="inherit"
          onClick={() => {
            dispatch(deleteReview(id))
          }}
        />,
      ]
    },
  }

  const reviewsWithAuthor = reviews.map(review => ({
    ...review,
    author: `${review.firstName} ${review.lastName}`,
  }))

  const statusColumn: GridColDef = {
    field: "status",
    headerName: "Статус",
    width: 130,

    renderCell: params => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Switch
          checked={params.row.status === "published"}
          onChange={event => {
            const newStatus = event.target.checked ? "published" : "pending"
            handleStatusChange(params.row.id, newStatus)
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body1">{params.row.status}</Typography>
      </div>
    ),
    type: "string",
    align: "center",
    headerAlign: "center",
  }

  const tableColumns: GridColDef[] = [
    ...columns.map(col => {
      if (col.field === "author") {
        return {
          ...col,
          valueGetter: (params: GridValueGetterParams) => params.row.author,
        }
      }

      return col
    }),
    statusColumn,
  ]

  tableColumns.push(actionsColumn)

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "22px",
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8F0FB",
            color: " #5c5e60",
            fontSize: "16px",
          },
          ".MuiDataGrid-cell": {
            color: " #5c5e60",
            fontSize: "16px",
          },
          ".MuiDataGrid-cell:focus": {
            outline: "none !important",
          },

          ".MuiDataGrid-cell[data-field='author']:hover, .MuiDataGrid-cell[data-field='review']:hover":
            {
              overflow: "visible !important",
              whiteSpace: "normal !important",
              wordWrap: "break-word",
              textOverflow: "clip",
              cursor: "pointer",
            },
        }}
      >
        <DataGrid
          rows={reviewsWithAuthor}
          columns={tableColumns}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          rowCount={count}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={({ page, pageSize }) => {
            setPage(page)
            setPageSize(pageSize)
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          columnHeaderHeight={44}
          rowHeight={107}
        />
      </Box>
    </>
  )
}

export default ReviewsTable
