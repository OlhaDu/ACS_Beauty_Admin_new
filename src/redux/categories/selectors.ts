import { IRootState } from "../store"

export const selectStatus = (state: IRootState) => state.categories.status
export const selectCategories = (state: IRootState) => state.categories.categories
export const selectError = (state: IRootState) => state.categories.error
