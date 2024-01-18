import { FormikValues } from "formik"
import { Dispatch, SetStateAction } from "react"

export interface IInitialValues extends FormikValues {
  image: null | File
  name: string
  description: string
  enabled: boolean
}

export interface IAddCategory {
  setIsAddCategoryActive: Dispatch<SetStateAction<boolean>>
}
