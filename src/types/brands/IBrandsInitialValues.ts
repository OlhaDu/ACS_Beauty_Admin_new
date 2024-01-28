import { FormikValues } from "formik"

export interface IBrandsInitialValues extends FormikValues {
  logo: null | File | string
  name: string | null
  description: string | null
}
