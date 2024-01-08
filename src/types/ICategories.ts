import { Dispatch, SetStateAction } from "react";
import { ICategory, ICategoryProp } from "./ICategory";

export interface ICategories {
  categories: ICategoryProp[];
  activeCategory: ICategory | null;
  setActiveCategory: Dispatch<SetStateAction<ICategoryProp>>;
}
