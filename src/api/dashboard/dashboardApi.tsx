import { instance } from "../brands/instance"
import { IResponse, IDashboard } from "src/types/dashboards"
import { GridRowId } from "@mui/x-data-grid"

export const dashboardApi = {
  // <---------- get ---------->
  getDashboards({ page = 1, pageSize = 10, lookup = "" }) {
    return instance.get<IResponse>(
      `dashboard?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    )
  },

  //  <---------- patch ---------->
  patchDashboard(id: number, status: { status: "published" | "pending" }) {
    return instance.patch<IDashboard>(`dashboard/${id}`, status)
  },

  // <---------- delete ---------->
  deleteDashboard(id: GridRowId) {
    return instance.delete(`dashboard/${id}`)
  },
}