import { createAsyncThunk } from "@reduxjs/toolkit"
import { GridRowId } from "@mui/x-data-grid"
import { IGetReviewsParams, IResponse, Review, IDeleteReview } from "src/types/Reviews"

import { reviewsApi } from "src/api/reviews/reviewsApi"

export const getReviews = createAsyncThunk<IResponse, IGetReviewsParams>(
  "reviews/getReviews",
  async (params: IGetReviewsParams = {}, { rejectWithValue }) => {
    try {
      const { data } = await reviewsApi.getReviews(params)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const patchReviews = createAsyncThunk<Review, { id: number; status: { status: string } }>(
  "reviews/patchReviews",
  async ({ id, status }, { rejectWithValue }) => {
    console.log("status", status)
    try {
      const { data } = await reviewsApi.patchReviews(id, status)

      return data
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteReview = createAsyncThunk<IDeleteReview, GridRowId>(
  "reviews/deleteReviews",
  async (id, { rejectWithValue }) => {
    try {
      await reviewsApi.deleteReview(id)

      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
