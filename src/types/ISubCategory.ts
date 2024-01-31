import { ISubCategoryResponse } from "src/api/categories/types"

export interface ISubCategory extends Omit<ISubCategoryResponse, "categoryId"> {}
