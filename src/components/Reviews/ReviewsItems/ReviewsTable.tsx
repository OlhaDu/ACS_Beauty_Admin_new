import { useSelector } from "react-redux"
import { useState } from "react"

import { columns } from "./columns"
import { useAppDispatch } from "src/redux/store"
import { selectReviews, selectCount } from "src/redux/reviews/selectors"
import { deleteReview } from "src/redux/reviews/operations"

import Box from "@mui/material/Box"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "src/images/svg/DeleteIconTS"

import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid"
import ModalWindow from "src/components/ModalWindow"
import ChangeStatus from "src/components/Reviews/Modal/ChangeStatusModal"
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

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState<GridRowId | null>(null)

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 110,
    cellClassName: "actions",

    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          color="inherit"
          onClick={() => {
            setIsOpenModal(true)
            setSelectedReview(id)
          }}
        />,
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

  const tableColumns: GridColDef[] = columns.map(col => {
    if (col.field === "author") {
      return {
        ...col,
        valueGetter: params => params.row.author,
      };
    }
  
    return col;
  });
console.log("reviewsWithAuthor", reviewsWithAuthor)
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
          pageSizeOptions={[ 10, 25, 50, 100]}
          columnHeaderHeight={44}
          rowHeight={107}
        />
      </Box>

      <ModalWindow
        title={"ЗМІНИТИ СТАТУС ВІДГУКУ"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <ChangeStatus
          onClose={() => setIsOpenModal(false)}
          review={reviews.find(review => review.id === selectedReview)}
        />
      </ModalWindow>
    </>
  )
}

export default ReviewsTable
