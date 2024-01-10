import { PropsWithChildren } from "react"
import { ICategories, ISubCategory } from "./"

export interface ICategoryProp {
  id: number
  name: string
  slug: string
  subcategories: ISubCategory[]
}

export interface ICategory extends Partial<Omit<ICategories, "categories">>, PropsWithChildren {
  category: ICategoryProp
}
