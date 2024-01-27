import { FormikValues } from "formik"

export interface INewsInitialValues extends FormikValues {
  banner: null | File | string
  title: string | null
  description: string | null
}
