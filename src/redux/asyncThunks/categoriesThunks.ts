import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "src/api"
import { IAddCategory } from "src/api/types"

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const res = await api.getCategories()
  return res.data
})

export const addCategory = createAsyncThunk(
  "categories/add",
  async (value: IAddCategory, { rejectWithValue }) => {
    try {
      const res = await api.addCategory(value)
      return res.data
    } catch (error) {
      return rejectWithValue("Така назва категорії вже використовується")
    }
  }
)
