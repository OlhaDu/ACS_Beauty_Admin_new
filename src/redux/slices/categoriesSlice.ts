import type { PayloadAction } from "@reduxjs/toolkit"
import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { ICategory } from "src/types"
import { getCategories } from "../asyncThunks/getCategoriesThunk"

interface IState {
  categories: ICategory[] | []
  acitveCategory: ICategory | null
  status: "pending" | "fulfilled" | "rejected"
  error: SerializedError | null
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
    setActiveCategory(state, action: PayloadAction<ICategory | null>) {
      state.acitveCategory = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.status = "pending"
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = "fulfilled"
      state.categories = action.payload
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.error
    })
  },
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
