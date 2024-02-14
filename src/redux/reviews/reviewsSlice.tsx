import { createSlice } from "@reduxjs/toolkit"
import { Review, ReviewRow } from "src/types/Reviews"
import { getReviews, patchReviews, deleteReview } from "./operations"
import { handlePending, handleRejected } from "src/Utils"

export interface ReviewsState {
  reviews: Review[]
  isLoading: boolean
  error: unknown | null
  count: number
  columns: ReviewRow[]
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  count: 0,
  columns: [],
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,

  reducers: {
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload)
      state.count -= 1
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getReviews.pending, handlePending)
      .addCase(getReviews.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.reviews = action.payload.rows
        state.isLoading = false
        state.error = null
      })
      .addCase(getReviews.rejected, handleRejected)

      .addCase(patchReviews.pending, handlePending)
      .addCase(patchReviews.fulfilled, (state, action) => {
        const updateReview = action.payload
        const index = state.reviews.findIndex(review => review.id === updateReview.id)
        if (index !== -1) {
          state.reviews[index].status = updateReview.status
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(patchReviews.rejected, handleRejected)

      .addCase(deleteReview.pending, handlePending)
      .addCase(deleteReview.fulfilled, (state, action) => {
        reviewsSlice.caseReducers.deleteReview(state, action)
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteReview.rejected, handleRejected)
  },
})

export const reviewsReducer = reviewsSlice.reducer
