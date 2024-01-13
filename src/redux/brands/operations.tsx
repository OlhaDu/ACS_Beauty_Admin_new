import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GridRowId } from "@mui/x-data-grid";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoiYWRtaXdlMjM0MzI0MmZ3ZW5Ad2Vmd2UyMy5jb20iLCJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTcwMzU2OTU4NCwiZXhwIjoxNzExMzQ1NTg0fQ.ZCj9Ub0jTLqCOtKTDI1CA-8hDDsLGOcp1-0qgVXMDr8";

axios.defaults.baseURL = "http://13.50.16.182:5000/api/brand";
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

interface GetBrandsParams {
  page?: number;
  pageSize?: number;
  lookup?: string;
}

export interface IBrand {
  id: number;
  logo: string;
  name: string;
  description: string;
  createdAt: string;
}

interface DeleteBrandResponse {
  id: GridRowId;
}

interface BrandData {
  count: number;
  rows: IBrand[];
}

export const getBrands = createAsyncThunk<BrandData, GetBrandsParams>(
  "brands/getBrands",
  async ({ page = 1, pageSize = 10, lookup = "" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<BrandData>(
        `?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
      );

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const createNewBrand = createAsyncThunk<IBrand, FormData>(
  "brands/createNewBrand",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IBrand>("", formData);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk<
  IBrand,
  { id: GridRowId; formData: FormData }
>("brands/updateBrand", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch<IBrand>(`/${id}`, formData);

    return data;
  } catch (error: unknown) {
    return rejectWithValue(error);
  }
});

export const deleteBrand = createAsyncThunk<DeleteBrandResponse, GridRowId>(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/${id}`);

      return { id };
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
