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
  rejectValue: unknown
}>()

export const getCategories = createCategoriesAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await categoriesApi.getCategories()
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const addCategory = createCategoriesAsyncThunk<ICategoryRes, FormData>(
  "categories/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.addCategory(formData)
      return data
    } catch (error) {
      return rejectWithValue(error)
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
      return rejectWithValue(error)
    }
  }
)

export const patchCategory = createCategoriesAsyncThunk<ICategoryRes, IUpdatedCategoryReq>(
  "categories/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.patchCategory(id, formData)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const patchSubCategory = createCategoriesAsyncThunk<ISubCategoryRes, IUpdatedSubCategoryReq>(
  "categories/patchSubCategory",
  async ({ id, updatedSubCategory }, { rejectWithValue }) => {
    try {
      const { data } = await categoriesApi.patchSubCategory(id, updatedSubCategory)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteCategory = createCategoriesAsyncThunk<number, number>(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await categoriesApi.deleteCategory(id)
      return id
    } catch (error) {
      return rejectWithValue(error)
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
    return rejectWithValue(error)
  }
})
