// import s from "./CategoryManagementForm.module.scss"
import { subCategoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import { IInitialValuesSubCategory, ISubCategoryManagementForm } from "src/types/categories"
import { FormikHelpers } from "formik"
import { FC } from "react"
import { addSubCategory, updateSubCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"

const SubCategoryManagementForm: FC<ISubCategoryManagementForm> = ({
  subcategory,
  categoryId,
  onClose,
}) => {
  const dispatch = useAppDispatch()

  const subCategoryForm = {
    initialValues: {
      name: subcategory?.name || "",
    },
    validationSchema: subCategoryFormSchema,
    groups: [
      {
        fields: [{ name: "name", label: "Назва підкатегорії" }],
      },
    ],
    onSubmit: async (
      values: IInitialValuesSubCategory,
      { resetForm, setFieldError }: FormikHelpers<IInitialValuesSubCategory>
    ) => {
      const { name } = values

      const formData = new FormData()
      formData.append("name", name)
      formData.append("categoryId", `${categoryId}`)

      let result = null
      if (subcategory) {
        result = await dispatch(
          updateSubCategory({ id: subcategory.id, updatedSubCategory: { name, categoryId } })
        )
      } else {
        result = await dispatch(addSubCategory({ name, categoryId }))
      }
      const { type, payload } = result
      if (type.includes("rejected") && typeof payload === "string") setFieldError("name", payload)
      if (type.includes("fulfilled")) {
        resetForm()
        onClose()
      }
    },
    btnName: subcategory ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<IInitialValuesSubCategory> {...subCategoryForm} />
}

export default SubCategoryManagementForm
