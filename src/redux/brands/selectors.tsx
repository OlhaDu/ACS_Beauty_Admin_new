import type { IBrand } from "src/api/brands/types";

export const selectIsLoading = (state: { brands: { isLoading: boolean } }) =>
  state.brands.isLoading;

export const selectIsError = (state: { brands: { error: unknown | null } }) =>
  state.brands.error;

export const selectBrands = (state: { brands: { brands: IBrand[] } }) =>
  state.brands.brands;

export const selectCount = (state: { brands: { count: number } }) =>
  state.brands.count;
