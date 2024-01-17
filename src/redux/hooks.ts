import { IRootState } from "./store"

export const selectActiveCategory = (state: IRootState) => state.categories.acitveCategory
export const selectCategories = (state: IRootState) => state.categories.categories
