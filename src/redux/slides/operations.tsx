import { GridRowId } from "@mui/x-data-grid"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { slidesApi } from "src/api/slides/slidesApi"
import { ISlide, IDeleteSlideResponse, IGetSlidesParams, IResponse } from "src/types/slides"

export const getSlides = createAsyncThunk<IResponse, IGetSlidesParams>(
  "slides/getSlides",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await slidesApi.getSlides(params)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const createNewSlide = createAsyncThunk<ISlide, FormData>(
  "slides/createNewSlide",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await slidesApi.postSlide(formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const patchSlide = createAsyncThunk<ISlide, { id: GridRowId; formData: FormData }>(
  "slides/patchSlide",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await slidesApi.patchSlide(id, formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteSlide = createAsyncThunk<IDeleteSlideResponse, GridRowId>(
  "slides/deleteSlide",
  async (id, { rejectWithValue }) => {
    try {
      await slidesApi.deleteSlide(id)

      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
