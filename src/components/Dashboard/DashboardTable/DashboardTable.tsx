import React from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/redux/store"
import { selectDashboards } from "src/redux/dashboards/selectors"
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid"
import { Switch, Typography } from "@mui/material"

import { columns } from "./columns"
import DeleteIcon from "src/images/svg/DeleteIconTS"
import Box from "@mui/material/Box"
import s from "./DashboardTable.module.scss"
import EditTableIcon from "src/images/svg/EditTableIcon"
import { deleteDashboard } from "src/redux/dashboards/operations"
import { updateDashboard } from "src/redux/dashboards/dashboardSlice"

interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const statusColors: { [key: string]: string } = {
  Оплачено: s.paid_status,
  Виконано: s.accepted_status,
}

const DashboardTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const dashboards = useSelector(selectDashboards)

  const handleStatusChange = (id: number, newStatus: "Оплачено" | "Виконано") => {
    dispatch(updateDashboard({ id, status: newStatus }))
  }
  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Дії",
    width: 140,
    cellClassName: "actions",

    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditTableIcon fill={"black"} />}
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

  const statusColumn: GridColDef = {
    field: "status",
    headerName: "Статус",
    align: "center",
    width: 110,

    renderCell: params => (
      <div className={s.statusStyle}>
        <Switch
          checked={params.row.status === "Виконано"}
          onChange={event => {
            const newStatus = event.target.checked ? "Виконано" : "Оплачено"
            handleStatusChange(params.row.id, newStatus)
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography
          variant="body1"
          className={statusColors[params.row.status]}
          onClick={() => {
            const newStatus = params.row.status === "Виконано" ? "Оплачено" : "Виконано"
            handleStatusChange(params.row.id, newStatus)
          }}
        >
          {params.row.status}
        </Typography>
      </div>
    ),
    type: "string",
    headerAlign: "center",
  }

  const tableColumns: GridColDef[] = columns.map(col =>
    col.field === "description"
      ? {
          ...col,
          renderCell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
        }
      : col
  )
  tableColumns.push(statusColumn)
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
