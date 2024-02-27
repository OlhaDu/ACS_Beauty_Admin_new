import { instance } from "../instance"
import { GridRowId } from "@mui/x-data-grid"
import { ISlide, IResponse } from "src/types/slides"

export const slidesApi = {
  getSlides({ page = 1, pageSize = 12 }) {
    return instance.get<IResponse>("/api/slide?page=1&pageSize=12")
  },

  postSlide(formData: FormData) {
    return instance.post<ISlide>("/api/slide", formData)
  },

  patchSlide(id: GridRowId, formData: FormData) {
    return instance.patch<ISlide>(`/api/slide/${id}`, formData)
  },

  deleteSlide(id: GridRowId) {
    return instance.delete(`/api/slide/${id}`)
  },
}
