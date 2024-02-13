import { instance } from "../instance"
import { GridRowId } from "@mui/x-data-grid"
import { IBrand, IResponse } from "src/types/brands"

export const brandsApi = {
  // <---------- get ---------->
  getBrands({ page = 1, pageSize = 10, lookup = "" }) {
    return instance.get<IResponse>(
      `brand?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    )
  },

  // <---------- post ---------->
  postBrand(formData: FormData) {
    return instance.post<IBrand>("brand/", formData)
  },

  // <---------- patch ---------->
  patchBrand(id: GridRowId, formData: FormData) {
    return instance.patch<IBrand>(`brand/${id}`, formData)
  },

  // <---------- delete ---------->
  deleteBrand(id: GridRowId) {
    return instance.delete(`brand/${id}`)
  },
}
