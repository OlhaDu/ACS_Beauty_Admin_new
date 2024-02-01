import { createAsyncThunk } from "@reduxjs/toolkit"
import { Review } from "src/types/Reviews"
import axios from "axios"

interface ReviewsState {
  reviews: Review[]
  status: "idle" | "pending" | "fulfilled" | "rejected"
}
export const fetchReviews = createAsyncThunk<ReviewsState, number>(
    'reviews/fetchReviews',
    async (params, { rejectWithValue }) => {
      try {
        const {data} = await axios.get(`api/feedback?page=${params}`);
        console.log("data", data.rows)
        return { reviews: data.rows, status: 'fulfilled' } as ReviewsState;
      } catch (error) {
        return rejectWithValue({ error: 'Failed to fetch reviews' });
      }
    }
  );