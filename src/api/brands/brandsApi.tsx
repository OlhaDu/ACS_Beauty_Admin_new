import { instance } from "../instance"
import { GridRowId } from "@mui/x-data-grid"
import { IBrand, IResponse } from "src/types/brands"

export const brandsApi = {
  // <---------- get ---------->
  getBrands: ({ page = 1, pageSize = 10, lookup = "" }) =>
    instance.get<IResponse>(
      `brand?page=${page}&pageSize=${pageSize}${lookup ? `&lookup=${lookup}` : ""}`
    ),

  // <---------- post ---------->
  postBrand: (formData: FormData) => instance.post<IBrand>("brand/", formData),

  // <---------- patch ---------->
  patchBrand: (id: GridRowId, formData: FormData) =>
    instance.patch<IBrand>(`brand/${id}`, formData),

  // <---------- delete ---------->
  deleteBrand: (id: GridRowId) => instance.delete(`brand/${id}`),
}
