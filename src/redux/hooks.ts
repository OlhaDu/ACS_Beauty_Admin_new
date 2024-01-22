import { RootState } from "./store"

export const selectActiveCategory = (state: RootState) => state.categories.acitveCategory
export const selectCategories = (state: RootState) => state.categories.categories
