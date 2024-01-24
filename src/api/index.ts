import axios from "axios"
import { IAddCategory, IAddUpdateSubcategory, IUpdateCategory, IUpdateUsers } from "./types"

const { VITE_API_BASE_URL, VITE_API_AUTH_TOKEN } = import.meta.env

const http = axios.create({
  baseURL: VITE_API_BASE_URL, //заменить адрес на константу (.env)
})

http.defaults.headers.common["Authorization"] = `Bearer ${VITE_API_AUTH_TOKEN}`

export const api = {
  getCategories: () => http.get("/category"),

  addCategory: (newCategory: IAddCategory) => http.post("/category", newCategory),

  addSubcategory: (newSubCategory: IAddUpdateSubcategory) =>
    http.post("/subcategory", newSubCategory),

  updateCategory: (updatedCategory: IUpdateCategory) => http.patch("/category", updatedCategory),

  updateSubcategory: (updatedSubCategory: IAddUpdateSubcategory) =>
    http.patch("/subcategory", updatedSubCategory),

  deleteCategory: (id: number) => http.delete(`/category/${id}`),

  deleteSubcategory: (id: number) => http.delete(`/subcategory/${id}`),

  updateUsers: (updatedUsers: IUpdateUsers) => http.patch(`/user/${updatedUsers.id}`, updatedUsers),
}
