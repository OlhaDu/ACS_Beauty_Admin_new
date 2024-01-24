// import CloseIcon from "src/images/svg/CloseIcon_"
// import Border from "../Border"
import s from "./AddCategory.module.scss"
import { addCategoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import AddImageInput from "../AddImageInput"
import { IInitialValues } from "src/types"
import { FormikHelpers } from "formik"
import { useState } from "react"
import { addCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"

const AddCategory = () => {
  const [inputToggler, setInputToggler] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const addCategoryForm = {
    initialValues: {
      image: null,
      name: "",
      description: "",
    },
    validationSchema: addCategoryFormSchema,
    groups: [
      {
        fields: [
          {
            component: <AddImageInput categoryName="newCategory" inputToggler={inputToggler} />,
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
      value: IInitialValues,
      { resetForm, setFieldError }: FormikHelpers<IInitialValues>
    ) => {
      const { type, payload } = await dispatch(addCategory(value))
      if (type.includes("rejected")) setFieldError("name", payload)
      if (type.includes("fulfilled")) {
        setInputToggler(!inputToggler)
        resetForm()
      }
    },
  }

  return <FormGenerator<IInitialValues> {...addCategoryForm} />
}

export default AddCategory
