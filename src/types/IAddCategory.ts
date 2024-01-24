import { FormikValues } from "formik"

export interface IInitialValues extends FormikValues {
  image: null | File
  name: string
  description: string
}
