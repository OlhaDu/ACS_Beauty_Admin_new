import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api/admin/", //заменить адрес на константу (.env)
});
export const api = {
  getCategories: () => http.get('categories'),
  
  addCategory: (data) => http.post('category', data),

  addSubcategory: (data) => http.post('subcategory', data),
  
  updateCategory: (data) => http.patch('category', data),

  updateSubcategory: (data) => http.patch('subcategory', data),
  
  deleteCategory: (id) => http.delete(`category/${id}`, id),

  deleteSubcategory: (id) => http.delete(`subcategory/${id}`, id)
}
