import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get("/api/category"),

  addCategory: (data: object) => http.post("category", data),

  addSubcategory: (data: object) => http.post("subcategory", data),

  updateCategory: (data: object) => http.patch("category", data),

  updateSubcategory: (data: object) => http.patch("subcategory", data),

  deleteCategory: (id: object) => http.delete(`category/${id}`, id),

  deleteSubcategory: (id: object) => http.delete(`subcategory/${id}`, id),
};
