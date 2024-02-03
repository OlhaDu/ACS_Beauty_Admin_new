import { createAsyncThunk } from "@reduxjs/toolkit"
import { IGetReviewsParams, IResponse } from "src/types/Reviews";

import { reviewsApi } from "src/api/reviews/reviewsApi";


export const getReviews = createAsyncThunk<IResponse, IGetReviewsParams>(
    'reviews/getReviews',
    async (params, { rejectWithValue }) => {
      try {
        const {data} = await reviewsApi.getReviews(params);
        console.log("data", data)
        return data   
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );