import { ISubCategoryRes } from "./ISubCategoryRes"

export interface ISubCategory extends Omit<ISubCategoryRes, "categoryId"> {}
