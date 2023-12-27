export interface IAddCategory {
  name: string;
}

export interface IAddSubcategory {
  name: string;
  CategoryId: string;
}

export interface IUpdateCategory {
  name: string;
  slug: string;
}

export interface IUpdateSubcategory {
  name: string;
  CategoryId: string;
}
