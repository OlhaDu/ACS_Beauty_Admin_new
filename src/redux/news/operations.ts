import { GridRowId } from "@mui/x-data-grid"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { newsApi } from "src/api/news/newsApi"
import { IGetNewsParams, INovelty, IResponse } from "src/types/news"

export const getNews = createAsyncThunk<IResponse, IGetNewsParams>(
  "news/getNews",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await newsApi.getNews(params)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const createNewNews = createAsyncThunk<INovelty, FormData>(
  "news/createNewNews",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await newsApi.postNews(formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const patchNews = createAsyncThunk<INovelty, { id: GridRowId; formData: FormData }>(
  "news/patchNews",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await newsApi.patchNews(id, formData)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteNews = createAsyncThunk<{ id: GridRowId }, GridRowId>(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      await newsApi.deleteNews(id)

      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
