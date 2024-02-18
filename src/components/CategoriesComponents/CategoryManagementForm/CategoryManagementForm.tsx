import { categoryFormSchema } from "src/libs/yup"
import FormGenerator from "../../FormGenerator"
import AddImageInput from "../AddImageInput"
import { ICategoryManagementForm, IInitialValuesCategory } from "src/types/categories"
import { FormikHelpers } from "formik"
import { FC, useState } from "react"
import { addCategory, patchCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"
import { getErrorMessage } from "../helpers"

const CategoryManagementForm: FC<ICategoryManagementForm> = ({ category, onClose }) => {
  const [image, setImage] = useState<string | null>(category?.image || null)
  const dispatch = useAppDispatch()

  const categoryForm = {
    initialValues: {
      name: category?.name || "",
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
        fields: [{ name: "name", label: "Назва категорії" }],
      },
    ],
    onSubmit: async (
      values: IInitialValuesCategory,
      { resetForm, setFieldError }: FormikHelpers<IInitialValuesCategory>
    ) => {
      const formData = new FormData()
      const { name, image } = values

      formData.append("name", name)
      image && formData.append("image", image)

      try {
        if (category) {
          await dispatch(patchCategory({ id: category.id, formData })).unwrap()
        } else {
          await dispatch(addCategory(formData)).unwrap()
        }
        resetForm()
        setImage(null)
        onClose()
      } catch (error) {
        const message = getErrorMessage(error)
        setFieldError("name", message)
      }
    },
    btnName: category ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<IInitialValuesCategory> {...categoryForm} />
}

export default CategoryManagementForm
