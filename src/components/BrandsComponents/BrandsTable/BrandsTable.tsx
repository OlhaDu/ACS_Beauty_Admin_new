import { useSelector } from "react-redux"
import { useState } from "react"

import { columns } from "./columns"
import { deleteBrand } from "src/redux/brands/operations"
import { selectBrands, selectCount } from "src/redux/brands/selectors"
import { useAppDispatch } from "src/redux/hooks"

import Box from "@mui/material/Box"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"

import ModalWindow from "src/components/ModalWindow"
import BrandManagementForm from "../BrandManagementForm"

import { DataGrid, GridColDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid"

interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const BrandsTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const brands = useSelector(selectBrands)
  const count = useSelector(selectCount)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<GridRowId | null>(null)

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
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
            setSelectedBrand(id)
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          onClick={() => {
            dispatch(deleteBrand(id))
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
          rows={brands}
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

      <ModalWindow
        title={"РЕДАГУВАТИ БРЕНД"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <BrandManagementForm
          brand={brands.find(brand => brand.id === selectedBrand)}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalWindow>
    </>
  )
}

export default BrandsTable
