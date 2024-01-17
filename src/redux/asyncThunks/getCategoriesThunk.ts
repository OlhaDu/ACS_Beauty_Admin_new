import { createAsyncThunk } from "@reduxjs/toolkit"
// import { ICategoryProp } from "src/types"
import { api } from "src/api"

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const res = await api.getCategories()
  return res.data
})
