import { createSlice } from "@reduxjs/toolkit"
import { ICategory } from "src/types"
import { addCategory, deleteCategory, getCategories, updateCategory } from "./operations"

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

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = "fulfilled"
      state.categories = action.payload
    })
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.status = "fulfilled"
      state.error = ""
      state.categories.push(action.payload)
    })
    builder.addCase(addCategory.rejected, (state, action) => {
      state.status = "rejected"
      if (action.payload) state.error = action.payload
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = "fulfilled"
      state.categories = state.categories.filter(category => category.id !== action.payload)
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.status = "rejected"
      if (action.payload) state.error = action.payload
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updatedCategory = action.payload
      const index = state.categories.findIndex(category => category.id === updatedCategory.id)

      if (index === -1) return
      state.categories[index] = updatedCategory
    })
  },
})

export default categoriesSlice.reducer
