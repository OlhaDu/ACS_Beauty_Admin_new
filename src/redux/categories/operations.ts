import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "src/api/categories"
import {
  IAddSubCategory,
  ICategoryResponse,
  IDeleteSubCategory,
  ISubCategoryResponse,
  IUpdatedCategoryOrSubCategory,
} from "src/api/categories/types"

const createAppAsyncThunk = createAsyncThunk.withTypes<{ rejectValue: string }>()

export const getCategories = createAppAsyncThunk("categories/getAll", async () => {
  const res = await api.getCategories()
  return res.data
})

export const addCategory = createAppAsyncThunk<ICategoryResponse, FormData>(
  "categories/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.addCategory(formData)
      return data
    } catch (error) {
      return rejectWithValue("Така назва категорії вже використовується")
    }
  }
)

export const updateCategory = createAppAsyncThunk<ICategoryResponse, IUpdatedCategoryOrSubCategory>(
  "categories/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateCategory(id, formData)
      return data
    } catch (error) {
      return rejectWithValue("Помилка при оновленні категорії")
    }
  }
)

export const deleteCategory = createAppAsyncThunk<number, number>(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteCategory(id)
      return id
    } catch (error) {
      return rejectWithValue("Помилка при видаленні")
    }
  }
)

export const addSubCategory = createAppAsyncThunk<ISubCategoryResponse, IAddSubCategory>(
  "categories/addSubCategory",
  async (subCategory, { rejectWithValue }) => {
    try {
      const { data } = await api.addSubcategory(subCategory)
      return data
    } catch (error) {
      return rejectWithValue("Така назва категорії вже використовується")
    }
  }
)

export const deleteSubCategory = createAppAsyncThunk<IDeleteSubCategory, IDeleteSubCategory>(
  "categories/deleteSubCategory",
  async ({ categoryId, subCategoryId }, { rejectWithValue }) => {
    try {
      await api.deleteSubcategory(subCategoryId)
      return { categoryId, subCategoryId }
    } catch (error) {
      return rejectWithValue("Помилка при видаленні")
    }
  }
)

export const updateSubCategory = createAppAsyncThunk<
  ISubCategoryResponse,
  IUpdatedCategoryOrSubCategory
>("categories/updateSubCategory", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await api.updateSubcategory(id, formData)
    return data
  } catch (error) {
    return rejectWithValue("Така назва підкатегорії вже використовується")
  }
})
