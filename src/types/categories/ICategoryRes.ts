import { ICategory } from "./ICategory"

export interface ICategoryRes extends Omit<ICategory, "subcategories"> {}
