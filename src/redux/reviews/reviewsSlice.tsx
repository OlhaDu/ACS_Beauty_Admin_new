import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Review } from "src/types/Reviews"
import { getReviews } from "./operations"

export interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: unknown | null;
  count: number;
  
  }


const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  count: 0,
  }


const reviewsSlice = createSlice({
  name: "reviews",
  initialState,

  reducers: {
    
    updatedReviews: (state, action: PayloadAction<Review>) => {
      const updateReview = action.payload
      const index = state.reviews.findIndex(review => review.id === updateReview.id)

      if (index === -1) return
      state.reviews[index] = updateReview
    },
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload.id)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getReviews.pending, handlePending)
      .addCase(getReviews.fulfilled, (state, action) => {
        
        state.count = action.payload.count;
        state.reviews = action.payload.rows;
        console.log("reviews", state.reviews)
        state.isLoading = false;
        state.error = null
      })
      .addCase(getReviews.rejected, handleRejected)
  },
})

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true;
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false;
  state.error = action.payload;
}
export const { updatedReviews, deleteReview } =
  reviewsSlice.actions

export const reviewsReducer = reviewsSlice.reducer
