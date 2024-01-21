import { IRootState } from "./store"

export const selectActiveCategory = (state: IRootState) => state.categories.acitveCategory
export const selectCategories = (state: IRootState) => state.categories.categories
export const selectProducts = (state: IRootState) => state.products.products
export const selectProductsPage = (state: IRootState) => state.products.page
export const selectProductsPageSize = (state: IRootState) => state.products.pageSize
