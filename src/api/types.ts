export interface IAddCategory {
  image: null | File;
  name: string;
  description: string;
  enabled: boolean;
}

export interface IAddUpdateSubcategory {
  name: string;
  CategoryId: string;
}

export interface IUpdateCategory {
  name: string;
  slug: string;
}

export interface IUpdateUsers {
  id: number;
  fullName: string;
  emai: string;
  phone_number: number;
  note: string;
  createdAt: string;
}
