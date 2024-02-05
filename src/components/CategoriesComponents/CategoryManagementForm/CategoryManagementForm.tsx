import s from "./CategoryManagementForm.module.scss"
import { categoryFormSchema } from "src/libs/yup"
import FormGenerator from "../../FormGenerator"
import AddImageInput from "../AddImageInput"
import { ICategoryManagementForm, IInitialValuesCategory } from "src/types/categories"
import { FormikHelpers } from "formik"
import { FC, useState } from "react"
import { addCategory, updateCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"

const CategoryManagementForm: FC<ICategoryManagementForm> = ({ category, onClose }) => {
  const [image, setImage] = useState<string | null>(category?.image || null)
  const dispatch = useAppDispatch()

  const categoryForm = {
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: category ? "edit" : null,
    },
    validationSchema: categoryFormSchema,
    groups: [
      {
        fields: [
          {
            component: <AddImageInput slug={category?.slug || "new category"} image={image} />,
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
      values: IInitialValuesCategory,
      { resetForm, setFieldError }: FormikHelpers<IInitialValuesCategory>
    ) => {
      const formData = new FormData()
      const { name, description, image } = values

      if (name && description && image) {
        formData.append("name", name)
        formData.append("description", description)
        image && formData.append("image", image)
      }

      let result = null
      if (category) {
        result = await dispatch(updateCategory({ id: category.id, formData }))
      } else {
        result = await dispatch(addCategory(formData))
      }
      const { type, payload } = result
      try {
        if (type.includes("rejected") && typeof payload === "string") throw new Error(payload)
        if (type.includes("fulfilled")) {
          resetForm()
          setImage(null)
          onClose()
        }
      } catch (error) {
        if (error instanceof Error) setFieldError("name", error.message)
      }
    },
    btnName: category ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<IInitialValuesCategory> {...categoryForm} />
}

export default CategoryManagementForm
