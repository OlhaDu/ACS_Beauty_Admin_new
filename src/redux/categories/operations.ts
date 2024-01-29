import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { api } from "src/api/categories"
import { IAddCategory, IUpdateCategory } from "src/api/categories/types"
import { ICategory } from "src/types"

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

export const updateCategory = createAppAsyncThunk<ICategory, IUpdateCategory>(
  "categories/update",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateCategory(value)
      return res.data
    } catch (error) {
      return rejectWithValue("Помилка при оновленні категорії")
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
