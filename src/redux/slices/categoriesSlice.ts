import { createSlice } from "@reduxjs/toolkit"
import { ICategory } from "src/types"
import { addCategory, getCategories } from "../asyncThunks/categoriesThunks"

interface IState {
  categories: ICategory[]
  acitveCategory: ICategory | null
  status: "pending" | "fulfilled" | "rejected"
  error: string | null
}

const initialState: IState = {
  categories: [],
  acitveCategory: null,
  status: "pending",
  error: null,
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
      state.categories.push(action.payload)
    })
    builder.addCase(addCategory.rejected, (state, action) => {
      state.status = "rejected"
      if (typeof action.payload === "string") state.error = action.payload
    })
  },
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
