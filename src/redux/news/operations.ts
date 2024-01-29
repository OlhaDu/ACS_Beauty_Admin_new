import { GridRowId } from "@mui/x-data-grid"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { newsApi } from "src/api/news/newsApi"
import { IDeleteNewsResponse, IGetNewsParams, INews, IResponse } from "src/types/news"

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

export const createNewNews = createAsyncThunk<INews, FormData>(
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

export const patchNews = createAsyncThunk<INews, { id: GridRowId; formData: FormData }>(
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

export const deleteNews = createAsyncThunk<IDeleteNewsResponse, GridRowId>(
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
