import axios from "axios";
import {
  IAddCategory,
  IAddSubcategory,
  IUpdateCategory,
  IUpdateSubcategory,
} from "./types";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get("/api/category"),

  addCategory: (data: IAddCategory) => http.post("/api/category", data),

  addSubcategory: (data: IAddSubcategory) => http.post("subcategory", data),

  updateCategory: (data: IUpdateCategory) => http.patch("category", data),

  updateSubcategory: (data: IUpdateSubcategory) =>
    http.patch("subcategory", data),

  deleteCategory: (id: number) => http.delete(`category/${id}`),

  deleteSubcategory: (id: number) => http.delete(`subcategory/${id}`),
};
