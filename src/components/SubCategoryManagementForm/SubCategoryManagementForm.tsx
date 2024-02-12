import { subCategoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import { IInitialValuesSubCategory, ISubCategoryManagementForm } from "src/types/categories"
import { FormikHelpers } from "formik"
import { FC } from "react"
import { addSubCategory, patchSubCategory } from "src/redux/categories/operations"
import { useAppDispatch } from "src/redux/hooks"
import { getErrorMessage } from "../CategoriesComponents/helpers"

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

      try {
        let result = null
        if (subcategory) {
          result = await dispatch(
            patchSubCategory({ id: subcategory.id, updatedSubCategory: { name, categoryId } })
          ).unwrap()
        } else {
          result = await dispatch(addSubCategory({ name, categoryId })).unwrap()
        }
        if (result) {
          resetForm()
          onClose()
        }
      } catch (error) {
        const message = getErrorMessage(error)
        setFieldError("name", message)
      }
    },
    btnName: subcategory ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<IInitialValuesSubCategory> {...subCategoryForm} />
}

export default SubCategoryManagementForm
