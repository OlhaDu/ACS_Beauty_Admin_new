import { instance } from "../instance"
import { ICategory, ISubCategoryReq, ISubCategoryRes } from "src/types/categories"

export const categoriesApi = {
  getCategories: () => instance.get("category/"),

  addCategory: (formData: FormData) => instance.post<ICategory>("category/", formData),

  patchCategory: (id: number, formData: FormData) =>
    instance.patch<ICategory>(`category/${id}`, formData),

  addSubcategory: (newSubCategory: ISubCategoryReq) =>
    instance.post<ISubCategoryRes>("subcategory/", newSubCategory),

  patchSubCategory: (id: number, updatedSubCategory: ISubCategoryReq) =>
    instance.patch<ISubCategoryRes>(`subcategory/${id}`, updatedSubCategory),

  deleteCategory: (id: number) => instance.delete(`category/${id}`),

  deleteSubcategory: (id: number) => instance.delete(`subcategory/${id}`),
}
