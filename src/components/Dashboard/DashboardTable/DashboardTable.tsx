import React from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/store"
import { selectDashboards } from "src/redux/dashboards/selectors"
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid"
import { columns } from "./columns"
import DeleteIcon from "src/images/svg/DeleteIconTS"
import Box from "@mui/material/Box"
import s from "./DashboardTable.module.scss"
import EditIcon from "src/images/svg/EditIcon"
import { deleteDashboard } from "src/redux/dashboards/operations"

interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const DashboardTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const dashboards = useSelector(selectDashboards) // const count = useSelector(selectCount)

  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 140,
    cellClassName: "actions",

    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          color="inherit"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon fill={"black"} width={53} height={53} />}
          label="Delete"
          color="inherit"
          onClick={() => {
            dispatch(deleteDashboard(id))
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
        className={s.container}
        sx={{
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
        }}
      >
        <DataGrid
          rows={dashboards}
          columns={tableColumns}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          // rowCount={count}
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

export default DashboardTable
