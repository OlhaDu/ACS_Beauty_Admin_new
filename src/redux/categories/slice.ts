import { createSlice } from "@reduxjs/toolkit"
import { ICategory } from "src/types"
import { addCategory, deleteCategory, getCategories } from "./operations"

interface IState {
  categories: ICategory[]
  acitveCategory: ICategory | null
  status: "pending" | "fulfilled" | "rejected"
  error: string
}

const initialState: IState = {
  categories: [],
  acitveCategory: null,
  status: "pending",
  error: "",
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.acitveCategory = action.payload
    },
  },
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
  },
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
