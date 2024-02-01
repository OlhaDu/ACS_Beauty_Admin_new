import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "src/api/categories"
import {
  ISubCategory,
  ICategoryResponse,
  IDeleteSubCategory,
  ISubCategoryResponse,
  IUpdatedCategory,
  IUpdatedSubCategory,
} from "src/api/categories/types"
import { IRootState } from "../store"

const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: IRootState; rejectValue: string }>()

const findSubcategoryByName = (state: IRootState, subcategory: ISubCategory) => {
  const { name, categoryId } = subcategory

  const {
    categories: { categories },
  } = state

  const categoryIndex = categories.findIndex(category => category.id === categoryId)

  const subcategoryFromState = categories[categoryIndex].subcategories.find(
    subcategory => subcategory.name === name
  )
  return subcategoryFromState
}

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

export const updateCategory = createAppAsyncThunk<ICategoryResponse, IUpdatedCategory>(
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

export const addSubCategory = createAppAsyncThunk<ISubCategoryResponse, ISubCategory>(
  "categories/addSubCategory",
  async (subCategory, { rejectWithValue, getState }) => {
    const subcategoryFromState = findSubcategoryByName(getState(), subCategory)

    try {
      if (subcategoryFromState) throw new Error()
      const { data } = await api.addSubcategory(subCategory)
      return data
    } catch (error) {
      return rejectWithValue("Така назва підкатегорії вже використовується")
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

export const updateSubCategory = createAppAsyncThunk<ISubCategoryResponse, IUpdatedSubCategory>(
  "categories/updateSubCategory",
  async ({ id, updatedSubCategory }, { getState, rejectWithValue }) => {
    const subcategoryFromState = findSubcategoryByName(getState(), updatedSubCategory)

    try {
      if (subcategoryFromState) throw new Error()
      const { data } = await api.updateSubcategory(id, updatedSubCategory)
      return data
    } catch (error) {
      return rejectWithValue("Така назва підкатегорії вже використовується")
    }
  }
)
