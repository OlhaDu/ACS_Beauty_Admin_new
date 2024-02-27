import { useSelector } from "react-redux"
import { useState } from "react"

import { columns } from "./columns"
import { deleteSlide } from "src/redux/slides/operations"
import { selectSlides, selectCount } from "src/redux/slides/selectors"
import { useAppDispatch } from "src/redux/hooks"

import Box from "@mui/material/Box"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"

import ModalWindow from "src/components/ModalWindow"
import SlideManagementForm from "../SlideManagementForm"

import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid"

interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const SlidesTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const slides = useSelector(selectSlides)
  const count = useSelector(selectCount)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<GridRowId | null>(null)

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    // headerName: "Дії",
    width: 100,
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
            setSelectedSlide(id)
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          onClick={() => {
            dispatch(deleteSlide(id))
          }}
        />,
      ]
    },
  }

  const tableColumns: GridColDef[] = columns.map(col =>
    col.field === "description"
      ? {
          ...col,
          renderCell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
        }
      : col
  )

  tableColumns.push(actionsColumn)

  return (
    <>
      <Box
        sx={{
          ".actions": {
            color: "text.secondary",
          },
          ".textPrimary": {
            color: "text.primary",
          },
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8F0FB",
          },
          ".MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
        }}
      >
        <DataGrid
          rows={slides}
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
          pageSizeOptions={[12, 25, 50, 100]}
          columnHeaderHeight={44}
          rowHeight={108}
        />
      </Box>

      <ModalWindow
        title={"РЕДАГУВАТИ CЛАЙД"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <SlideManagementForm
          slide={slides.find(slide => slide.id === selectedSlide)}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalWindow>
    </>
  )
}

export default SlidesTable
