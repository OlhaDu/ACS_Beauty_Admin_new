import { createAsyncThunk } from "@reduxjs/toolkit"
// import { ICategory } from "src/types"
import { api } from "src/api"

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const res = await api.getCategories()
  return res.data
})
