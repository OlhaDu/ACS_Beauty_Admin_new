import { instance } from "./instance"
import { IResponse } from "src/types/Reviews"

export const reviewsApi = {
    // <---------- get ---------->
    getReviews({ page = 1, pageSize = 10, lookup = "" }) {
      return instance.get<IResponse>(
        `feedback?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
      )
    }}