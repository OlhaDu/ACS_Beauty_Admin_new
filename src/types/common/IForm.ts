import { FormikHelpers, FormikValues } from "formik"
import { ReactElement } from "react"
import { AnyObjectSchema } from "yup"

interface IField {
  name?: string
  label?: string
  as?: string
  className?: string
  component?: ReactElement
}

interface IGroup {
  group?: string
  fields: IField[]
}

export interface IForm<T extends FormikValues> {
  initialValues: T
  validationSchema: AnyObjectSchema
  groups: IGroup[]
  onSubmit: (values: T, actions: FormikHelpers<T>) => void
  btnName: string
}
