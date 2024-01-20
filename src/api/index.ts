import axios from "axios";
import {
  IAddCategory,
  IAddUpdateSubcategory,
  IUpdateCategory,
  IUpdateUsers,
} from "./types";

const { VITE_API_BASE_URL, VITE_API_AUTH_TOKEN } = import.meta.env;

export const http = axios.create({
  baseURL: VITE_API_BASE_URL, //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get("/api/category"),

  addCategory: (newCategory: IAddCategory) =>
    http.post("/api/category", newCategory, {
      headers: { Authorization: `Bearer ${VITE_API_AUTH_TOKEN}` },
    }),

  addSubcategory: (newSubCategory: IAddUpdateSubcategory) =>
    http.post("/api/subcategory", newSubCategory),

  updateCategory: (updatedCategory: IUpdateCategory) =>
    http.patch("/api/category", updatedCategory),

  updateSubcategory: (updatedSubCategory: IAddUpdateSubcategory) =>
    http.patch("/api/subcategory", updatedSubCategory),

  deleteCategory: (id: number) => http.delete(`/api/category/${id}`),

  deleteSubcategory: (id: number) => http.delete(`/api/subcategory/${id}`),

  updateUsers: (updatedUsers: IUpdateUsers) =>
    http.patch(`/api/user/${updatedUsers.id}`, updatedUsers),
};
