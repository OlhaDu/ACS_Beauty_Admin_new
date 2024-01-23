import CloseIcon from "src/images/svg/CloseIcon_"
import Border from "../Border"
import s from "./AddCategory.module.scss"
import { addCategoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import AddImageInput from "../AddImageInput"
import { IAddCategory, IInitialValues } from "src/types"
import { FormikHelpers } from "formik"
import { FC, useState } from "react"
import { addCategory } from "src/redux/asyncThunks/categoriesThunks"
import { useAppDispatch } from "src/redux/hooks"

const AddCategory: FC<IAddCategory> = () => {
  const [inputToggler, setInputToggler] = useState<boolean>(false)
  // const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const closeAddCategory = () => {}

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

  return (
    <Border border="borderOuter" className={s.borderOuter}>
      <div className={s.head}>
        <h4>ДОДАТИ КАТЕГОРЇЮ</h4>
        <CloseIcon onClick={closeAddCategory} />
      </div>
      <FormGenerator<IInitialValues> {...addCategoryForm} />
    </Border>
  )
}

export default AddCategory
