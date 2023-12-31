import { Dispatch, SetStateAction } from "react";
import { ISubCategory } from "./";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  subcategories: ISubCategory[];
  isCategoryActive: boolean;
  setIsCategoryActive: Dispatch<SetStateAction<boolean>>;
  setActiveCategoryName: Dispatch<SetStateAction<string>>;
  setActiveSubcaterories: Dispatch<SetStateAction<ISubCategory[]>>;
}
