import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Review } from "src/types/Reviews"
import { getReviews, patchReviews, deleteReview } from "./operations"

export interface ReviewsState {
  reviews: Review[]
  isLoading: boolean
  error: unknown | null
  count: number
  filters: {
    ratingFilter: "positive" | "neutral" | "negative" | "all"
  }
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  count: 0,
  filters: {
    ratingFilter: "all",
  },
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,

  reducers: {
    setRatingFilter: (
      state,
      action: PayloadAction<"positive" | "neutral" | "negative" | "all">
    ) => {
      state.filters.ratingFilter = action.payload
      console.log("state.ratingFilter", state.filters.ratingFilter)
    },

    updatedReviews: (state, action) => {
      const updateReview = action.payload
      const index = state.reviews.findIndex(review => review.id === updateReview.id)

      if (index === -1) return
      state.reviews[index] = updateReview
    },
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload)
      console.log("first", state.reviews)
      console.log("action.payload.id", action.payload)
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
        reviewsSlice.caseReducers.updatedReviews(state, action)
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

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false
  state.error = action.payload
}
export const { setRatingFilter, updatedReviews } = reviewsSlice.actions

export const reviewsReducer = reviewsSlice.reducer
