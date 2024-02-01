import { createSlice } from "@reduxjs/toolkit"
import { ICategory } from "src/types"
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  getCategories,
  updateCategory,
  updateSubCategory,
} from "./operations"

interface IState {
  categories: ICategory[]
  status: "pending" | "fulfilled" | "rejected"
  error: string
}

const initialState: IState = {
  categories: [],
  status: "pending",
  error: "",
}

const habdleReject = (state: { status: string; error: unknown }, action: { payload: unknown }) => {
  state.status = "rejected"
  state.error = action.payload
}

const setFulfilledState = (state: { status: string; error: unknown }) => {
  state.status = "fulfilled"
  state.error = ""
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        setFulfilledState(state)
      })
      .addCase(addCategory.fulfilled, (state, { payload: newCategory }) => {
        state.categories.push({ ...newCategory, subcategories: [] })
        setFulfilledState(state)
      })
      .addCase(addCategory.rejected, habdleReject)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload)
        setFulfilledState(state)
      })
      .addCase(deleteCategory.rejected, habdleReject)
      .addCase(updateCategory.fulfilled, (state, { payload: updatedCategory }) => {
        const categoryIndex = state.categories.findIndex(
          category => category.id === updatedCategory.id
        )

        if (categoryIndex === -1) return
        state.categories[categoryIndex] = { ...state.categories[categoryIndex], ...updatedCategory }

        setFulfilledState(state)
      })
      .addCase(updateCategory.rejected, habdleReject)
      .addCase(addSubCategory.fulfilled, (state, { payload: { name, id, categoryId } }) => {
        const categoryIndex = state.categories.findIndex(category => category.id === categoryId)

        if (categoryIndex === -1) return
        state.categories[categoryIndex].subcategories.push({ name, id })
        setFulfilledState(state)
      })
      .addCase(addSubCategory.rejected, habdleReject)
      .addCase(deleteSubCategory.fulfilled, (state, { payload: { categoryId, subCategoryId } }) => {
        const categoryIndex = state.categories.findIndex(category => category.id === categoryId)

        if (categoryIndex === -1) return
        state.categories[categoryIndex].subcategories = state.categories[
          categoryIndex
        ].subcategories.filter(subcategory => subcategory.id !== subCategoryId)
        setFulfilledState(state)
      })
      .addCase(deleteSubCategory.rejected, habdleReject)
      .addCase(updateSubCategory.fulfilled, (state, { payload: { name, id, categoryId } }) => {
        const categoryIndex = state.categories.findIndex(category => category.id === categoryId)
        const subCategoryIndex = state.categories[categoryIndex].subcategories.findIndex(
          subcategory => subcategory.id === id
        )
        state.categories[categoryIndex].subcategories[subCategoryIndex].name = name
      })
  },
})

export default categoriesSlice.reducer
