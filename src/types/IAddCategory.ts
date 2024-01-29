import { FormikValues } from "formik"

export interface IInitialValues extends FormikValues {
  file: File | null
  name: string
  description: string
  slug?: string
}
