import { PropsWithChildren } from "react"
import { ISubCategory } from "./"

export interface ICategoryProp {
  id: number
  name: string
  slug: string
  subcategories: ISubCategory[]
}

export interface ICategory extends PropsWithChildren {
  category: ICategoryProp
}
