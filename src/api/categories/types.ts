import { ICategory } from "src/types"

export interface IUpdateUsers {
  fullName: string
  emai: string
  phone_number: number
  note: string
  createdAt: string
  id: number
}

export interface ICategoryResponse extends Omit<ICategory, "subcategories"> {}

export interface ISubCategoryResponse {
  name: string
  id: number
  categoryId: number
}

export interface IAddSubCategory {
  name: string
  categoryId: number
}

export interface IDeleteSubCategory {
  categoryId: number
  subCategoryId: number
}

export interface IUpdatedCategory {
  formData: FormData
  id: number
}

export interface IUpdatedSubCategory {
  updatedSubCategory: IAddSubCategory
  id: number
}
