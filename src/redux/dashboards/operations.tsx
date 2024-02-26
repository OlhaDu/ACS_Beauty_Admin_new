import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetDashboardParams, IResponse } from "src/types/dashboards";
import { fetchDashboardsFromBackend, deleteDashboardFromBackend } from "src/api/dashboard/dashboardService";
import { GridRowId } from "@mui/x-data-grid";
import { IDeleteReview } from "src/types/Reviews/IDeleteReview";

export const getDashboards = createAsyncThunk<IResponse, IGetDashboardParams >(
"dashboards/fetchDashboardsFromBackend",
async ( params: IGetDashboardParams = {},  {rejectWithValue}) => {
    try {
        const response = await fetchDashboardsFromBackend( params )
        console.log("data", response.rows)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const deleteDashboard = createAsyncThunk<IDeleteReview, GridRowId>(
    "dashboards/deleteDashboard",
    async (id, { rejectWithValue }) => {
        try {
            await deleteDashboardFromBackend(id)

            return { id }
        } catch (error) {
          return rejectWithValue(error)  
        }
    }
)