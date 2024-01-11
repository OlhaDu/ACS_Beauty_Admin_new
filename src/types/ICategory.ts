import { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { ISubCategory } from "./"

export interface ICategoryProp {
  id: number
  name: string
  slug: string
  subcategories: ISubCategory[]
}

export interface ICategory extends PropsWithChildren {
  category: ICategoryProp
  activeCategory?: ICategory | null
  setActiveCategory?: Dispatch<SetStateAction<ICategoryProp | null>>
}
