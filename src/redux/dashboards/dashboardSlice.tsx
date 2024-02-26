import { createSlice } from "@reduxjs/toolkit";
import { deleteDashboard, getDashboards } from "./operations";
import { IDashboard } from "src/types/dashboards";
import { handlePending, handleRejected } from "src/Utils"


export interface DashboardsState {
    dashboards: IDashboard[]
    isLoading: boolean
    error: unknown | null
        
}

const initialState: DashboardsState = {
    dashboards: [],
    isLoading: false,
    error:  null,
}

const dashboardSlice = createSlice({
    name: "dashboards",
    initialState,

    reducers: {

        deleteDashboard: ( state, action) => {
            state.dashboards = state.dashboards.filter(dashboard => dashboard.id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder
        .addCase( getDashboards.pending, handlePending)
        .addCase( getDashboards.fulfilled, (state, action) => {
            state.dashboards = action.payload.rows
            state.isLoading = false
            state.error = null
        })
        .addCase(getDashboards.rejected, handleRejected)

        .addCase(deleteDashboard.pending, handlePending)
        .addCase(deleteDashboard.fulfilled, (state, action) => {
            console.log("action", action)
            dashboardSlice.caseReducers.deleteDashboard(state, action)
            state.isLoading = false
            state.error = null
        })
        .addCase(deleteDashboard.rejected, handleRejected)
    },
})

export const dashboardReducer = dashboardSlice.reducer
