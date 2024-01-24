import { IRootState } from "../store"

export const selectActiveCategory = (state: IRootState) => state.categories.acitveCategory
export const selectCategories = (state: IRootState) => state.categories.categories
export const selectError = (state: IRootState) => state.categories.error
