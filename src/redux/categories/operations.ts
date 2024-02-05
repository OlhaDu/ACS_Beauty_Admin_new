import { createAsyncThunk } from "@reduxjs/toolkit"
import { categoriesApi } from "src/api/categories/categoriesApi"
import { IRootState } from "../store"
import {
  ICategoryRes,
  IDeleteSubCategoryReq,
  ISubCategoryReq,
  ISubCategoryRes,
  IUpdatedCategoryReq,
  IUpdatedSubCategoryReq,
} from "src/types/categories"

const createCategoriesAsyncThunk = createAsyncThunk.withTypes<{
  state: IRootState
  rejectValue: string
}>()

export const getCategories = createCategoriesAsyncThunk("categories/getAll", async () => {
  try {
    const res = await categoriesApi.getCategories()
    return res.data
  } catch (error) {
    alert(error)
  }
})

export const addCategory = createCategoriesAsyncThunk<ICategoryRes, FormData>(
  "categories/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.addCategory(formData)
      return data
    } catch (error) {
      return rejectWithValue("Така назва категорії вже використовується")
    }
  }
)

export const addSubCategory = createCategoriesAsyncThunk<ISubCategoryRes, ISubCategoryReq>(
  "categories/addSubCategory",
  async (subCategory, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.addSubcategory(subCategory)
      return data
    } catch (error) {
      return rejectWithValue("Така назва підкатегорії вже використовується")
    }
  }
)

export const updateCategory = createCategoriesAsyncThunk<ICategoryRes, IUpdatedCategoryReq>(
  "categories/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.updateCategory(id, formData)
      return data
    } catch (error) {
      return rejectWithValue("Помилка при оновленні категорії")
    }
  }
)

export const updateSubCategory = createCategoriesAsyncThunk<
  ISubCategoryRes,
  IUpdatedSubCategoryReq
>("categories/updateSubCategory", async ({ id, updatedSubCategory }, { rejectWithValue }) => {
  try {
    const { data } = await categoriesApi.updateSubcategory(id, updatedSubCategory)
    return data
  } catch (error) {
    return rejectWithValue("Така назва підкатегорії вже використовується")
  }
})

export const deleteCategory = createCategoriesAsyncThunk<number, number>(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await categoriesApi.deleteCategory(id)
      return id
    } catch (error) {
      return rejectWithValue("Помилка при видаленні")
    }
  }
)

export const deleteSubCategory = createCategoriesAsyncThunk<
  IDeleteSubCategoryReq,
  IDeleteSubCategoryReq
>("categories/deleteSubCategory", async ({ categoryId, subCategoryId }, { rejectWithValue }) => {
  try {
    await categoriesApi.deleteSubcategory(subCategoryId)
    return { categoryId, subCategoryId }
  } catch (error) {
    return rejectWithValue("Помилка при видаленні")
  }
})
