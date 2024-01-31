import s from "./AddOrUpdateCategory.module.scss"
import { categoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import AddImageInput from "../AddImageInput"
import { IInitialValuesAddCategory, IInitialValuesUpdateCategory } from "src/types"
import { FormikHelpers } from "formik"
import { FC, useState } from "react"
import { updateCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"

interface IAddOrUpdateCategory {
  initialValues: IInitialValuesUpdateCategory | IInitialValuesAddCategory
  logo: string
  action: "add" | "update"
}

const AddOrUpdateCategory: FC<IAddOrUpdateCategory> = ({ initialValues, logo, action }) => {
  const [inputToggler, setInputToggler] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { slug } = initialValues

  const addCategoryForm = {
    initialValues,
    validationSchema: categoryFormSchema,
    groups: [
      {
        fields: [
          {
            component: <AddImageInput logo={logo} inputToggler={inputToggler} slug={slug} />,
          },
        ],
      },
      {
        group: "Основна інформація",
        fields: [
          { name: "name", label: "Назва категорії" },
          {
            name: "description",
            label: "Опис",
            as: "textarea",
            className: s.textArea,
          },
        ],
      },
    ],
    onSubmit: async (
      value: IInitialValuesAddCategory | IInitialValuesUpdateCategory,
      {
        resetForm,
        setFieldError,
        setFieldValue,
      }: FormikHelpers<IInitialValuesAddCategory | IInitialValuesUpdateCategory>
    ) => {
      if (action === "update") {
        setFieldValue("slug", slug)
        const { type, payload } = await dispatch(updateCategory(value))
        if (type.includes("rejected")) setFieldError("name", payload)
        if (type.includes("fulfilled")) {
          setInputToggler(!inputToggler)
          resetForm()
        }
      }
    },
  }

  return (
    <FormGenerator<IInitialValuesAddCategory | IInitialValuesUpdateCategory> {...addCategoryForm} />
  )
}

export default AddOrUpdateCategory
