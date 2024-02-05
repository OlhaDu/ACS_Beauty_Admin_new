import { ISubCategory } from "."

export interface ICategory {
  id: number
  name: string
  slug: string
  image: string
  description: string
  subcategories: ISubCategory[]
}
