import { GridRowId } from "@mui/x-data-grid"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { brandsApi } from "src/api/brands/brandsApi"
import { IBrand, IGetBrandsParams, IResponse } from "src/types/brands"

export const getBrands = createAsyncThunk<IResponse, IGetBrandsParams>(
  "brands/getBrands",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await brandsApi.getBrands(params)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const createNewBrand = createAsyncThunk<IBrand, FormData>(
  "brands/createNewBrand",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await brandsApi.postBrand(formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const patchBrand = createAsyncThunk<IBrand, { id: GridRowId; formData: FormData }>(
  "brands/patchBrand",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await brandsApi.patchBrand(id, formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteBrand = createAsyncThunk<{ id: GridRowId }, GridRowId>(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      await brandsApi.deleteBrand(id)

      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
