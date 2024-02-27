import { FormikValues } from "formik"

export interface ISlidesInitialValues extends FormikValues {
  desktopBanner: null | File | string
  mobileBanner: null | File | string
  priority: string
}
