import axios from "axios";
import { IAddCategory, IAddUpdateSubcategory, IUpdateCategory } from "./types";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get("/api/category"),

  addCategory: (data: IAddCategory) => http.post("/api/category", data),

  addSubcategory: (data: IAddUpdateSubcategory) =>
    http.post("/api/subcategory", data),

  updateCategory: (data: IUpdateCategory) => http.patch("/api/category", data),

  updateSubcategory: (data: IAddUpdateSubcategory) =>
    http.patch("/api/subcategory", data),

  deleteCategory: (id: number) => http.delete(`/api/category/${id}`),

  deleteSubcategory: (id: number) => http.delete(`/api/subcategory/${id}`),
};
