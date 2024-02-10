import type { Review, ReviewRow } from "src/types/Reviews"

export const selectIsLoading = (state: { reviews: { isLoading: boolean } }) =>
  state.reviews.isLoading

export const selectIsError = (state: { reviews: { error: unknown | null } }) => state.reviews.error

export const selectCount = (state: { reviews: { count: number } }) => state.reviews.count

export const selectReviews = (state: { reviews: { reviews: Review[] } }) => state.reviews.reviews

export const selectColumns = (state: { reviews: { columns: ReviewRow[] } }) => state.reviews.columns
