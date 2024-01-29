export interface IAddCategory {
  file: null | File
  name: string
  description: string
}
export interface IUpdateCategory {
  file: null | File
  name: string
  description: string
  slug: string
}

export interface IAddUpdateSubcategory {
  name: string
  CategoryId: string
}

export interface IUpdateUsers {
  id: number
  fullName: string
  emai: string
  phone_number: number
  note: string
  createdAt: string
}
