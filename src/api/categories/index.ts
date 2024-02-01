import axios from "axios"
import { ISubCategory, ISubCategoryResponse, IUpdateUsers } from "./types"
import { ICategory } from "src/types"

const { VITE_API_BASE_URL, VITE_API_AUTH_TOKEN } = import.meta.env

const http = axios.create({
  baseURL: VITE_API_BASE_URL, //заменить адрес на константу (.env)
})

http.defaults.headers.common["Authorization"] = `Bearer ${VITE_API_AUTH_TOKEN}`

export const api = {
  getCategories: () => http.get("/category"),

  addCategory: (formData: FormData) => http.post<ICategory>("/category", formData),

  updateCategory: (id: number, formData: FormData) =>
    http.patch<ICategory>(`/category/${id}`, formData),

  addSubcategory: (newSubCategory: ISubCategory) =>
    http.post<ISubCategoryResponse>("/subcategory", newSubCategory),

  updateSubcategory: (id: number, updatedSubCategory: ISubCategory) =>
    http.patch<ISubCategoryResponse>(`/subcategory/${id}`, updatedSubCategory),

  deleteCategory: (id: number) => http.delete(`/category/${id}`),

  deleteSubcategory: (id: number) => http.delete(`/subcategory/${id}`),

  updateUsers: (updatedUsers: IUpdateUsers) => http.patch(`/user/${updatedUsers.id}`, updatedUsers),
}