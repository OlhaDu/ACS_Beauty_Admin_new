import { FormikValues } from "formik"

export interface INoveltyInitialValues extends FormikValues {
  banner: null | File | string
  title: string | null
  text: string | null
}
