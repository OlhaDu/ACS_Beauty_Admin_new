import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { api } from "src/api"
import { IAddCategory } from "src/api/types"


const createAppAsyncThunk = createAsyncThunk.withTypes<{ rejectValue: string }>()

export const getCategories = createAppAsyncThunk("categories/getAll", async () => {
  const res = await api.getCategories()
  return res.data
})

export const addCategory = createAppAsyncThunk(
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

export const deleteCategory = createAppAsyncThunk(
  "categories/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.deleteCategory(id)
      return id
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.message)
    }
  }
)
