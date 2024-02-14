import { instance } from "../instance"
import { GridRowId } from "@mui/x-data-grid"
import { INovelty, IResponse } from "src/types/news"

export const newsApi = {
  // <---------- get ---------->
  getNews({ page = 1, pageSize = 10, lookup = "" }) {
    return instance.get<IResponse>(
      `news?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    )
  },

  // <---------- post ---------->
  postNews(formData: FormData) {
    return instance.post<INovelty>("news/", formData)
  },

  // <---------- patch ---------->
  patchNews(id: GridRowId, formData: FormData) {
    return instance.patch<INovelty>(`news/${id}`, formData)
  },

  // <---------- delete ---------->
  deleteNews(id: GridRowId) {
    return instance.delete(`news/${id}`)
  },
}
