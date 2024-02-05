import { FormikValues } from "formik"
import { ISubCategory } from "./ISubCategory"

export interface ISubCategoryManagementForm {
  subcategory?: ISubCategory
  categoryId: number
  onClose: () => void
}

export interface IInitialValuesSubCategory extends FormikValues {
  name: string
}
