import { IDashboard } from "src/types/dashboards"

export const selectIsLoading = (state: { dashboards: { isLoading: boolean } }) =>
  state.dashboards.isLoading

  export const selectDashboards = (state: { dashboards: { dashboards: IDashboard[] } }) => 
   state.dashboards.dashboards
  