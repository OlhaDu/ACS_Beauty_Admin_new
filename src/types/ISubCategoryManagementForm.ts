import { FormikValues } from "formik"
import { ISubCategory } from "./ISubCategory"

export interface ISubCategoryManagementForm {
  subCategory?: ISubCategory
  categoryId: number
  onClose: () => void
}

export interface IInitialValuesSubCategory extends FormikValues {
  name: string
}
