export interface IAddCategory {
  name: string;
}

export interface IAddUpdateSubcategory {
  name: string;
  CategoryId: string;
}

export interface IUpdateCategory {
  name: string;
  slug: string;
}
