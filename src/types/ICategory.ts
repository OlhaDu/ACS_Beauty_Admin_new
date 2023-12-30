import { ISubCategory } from "./";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  subcategories: ISubCategory[];
}
