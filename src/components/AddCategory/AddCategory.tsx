import CloseIcon from "src/images/svg/CloseIcon_"
import Border from "../Border"
import s from "./AddCategory.module.scss"
import { addCategoryFormSchema } from "src/libs/yup"
import FormGenerator from "../FormGenerator"
import AddImageInput from "../AddImageInput"
import { api } from "src/api"
import { IAddCategory, IInitialValues } from "src/types"
import { FormikHelpers } from "formik"
import { FC, useRef } from "react"

const AddCategory: FC<IAddCategory> = ({ setIsAddCategoryActive }) => {
  const bgImageRef = useRef<HTMLDivElement>(null)

  const closeAddCategory = () => setIsAddCategoryActive(false)

  const addCategoryForm = {
    initialValues: {
      image: null,
      name: "",
      description: "",
      enabled: false,
    },
    validationSchema: addCategoryFormSchema,
    groups: [
      {
        fields: [
          {
            component: <AddImageInput bgImageRef={bgImageRef} />,
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
    onSubmit: async (value: IInitialValues, { resetForm }: FormikHelpers<IInitialValues>) => {
      try {
        await api.addCategory(value)
        resetForm()
        const el = bgImageRef.current
        if (el) el.style.background = ""
      } catch (error) {
        alert(error)
      }
    },
    isToggler: false,
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
