import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Review } from "src/types/Reviews"
import { fetchReviews } from "./operations"

export interface ReviewsState {
  reviews: Review[]
  isLoading: boolean
  error: unknown | null
  status: "idle" | "pending" | "fulfilled" | "rejected"
  filters: {
    ratingFilter: "positive" | "neutral" | "negative" | undefined,
  statusFilter: "pending" | "published" | undefined,
  },
  
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  status: "idle",
  filters: {
    ratingFilter: undefined,
    statusFilter: undefined,
  },
 
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,

  reducers: {
    setRatingFilter: (state, action: PayloadAction<"positive" | "neutral" | "negative" | undefined>) => {
      state.filters.ratingFilter = action.payload;
      console.log("state.ratingFilter", state.filters.ratingFilter)
    },
    
    setStatusFilter: (state, action: PayloadAction<"pending" | "published" | undefined>) => {
      state.filters.statusFilter = action.payload;
      console.log("state.statusFilter", state.filters.statusFilter)
    },
    updatedReviews: (state, action: PayloadAction<Review>) => {
      const updateReview = action.payload
      const index = state.reviews.findIndex(review => review.id === updateReview.id)

      if (index === -1) return
      state.reviews[index] = updateReview
    },
    deleteReviews: (state, action) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload.id)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => {
        state.status = "pending"
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.reviews = action.payload.reviews
        console.log("reviews", state.reviews)
        state.error = null
      })
      .addCase(fetchReviews.rejected, state => {
        state.status = "rejected"
      })

  },
})

export const { setRatingFilter, setStatusFilter, updatedReviews, deleteReviews } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer
