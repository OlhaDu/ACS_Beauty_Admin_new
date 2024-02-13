import { useState } from "react"
import { FormikHelpers } from "formik"

import { useAppDispatch } from "src/redux/hooks"
import { IBrand, IBrandsInitialValues } from "src/types/brands"
import { brandManagerSchema } from "src/libs/yup/brandManager.schema"
import { createNewBrand, patchBrand } from "src/redux/brands/operations"

import s from "./BrandManagementForm.module.scss"
import AddLogoInput from "../AddLogoInput/AddLogoInput"
import FormGenerator from "src/components/FormGenerator"

interface IProps {
  brand?: IBrand
  onClose: () => void
}

const BrandManagementForm: React.FC<IProps> = ({ brand, onClose }) => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState(brand?.logo || null)

  const addCategoryForm = {
    initialValues: {
      logo: image,
      name: brand?.name || "",
      description: brand?.description || "",
    },
    validationSchema: brandManagerSchema,
    groups: [
      {
        fields: [
          {
            component: <AddLogoInput brandName={brand?.name || ""} brandLogo={image} />,
          },
        ],
      },
      {
        fields: [
          { name: "name", label: "Назва" },
          {
            name: "description",
            label: "Опис",
            as: "textarea",
            className: s.brand_form__textarea,
          },
        ],
      },
    ],
    onSubmit: async (
      value: IBrandsInitialValues,
      { resetForm }: FormikHelpers<IBrandsInitialValues>
    ) => {
      const formData = new FormData()
      const { logo, name, description } = value

      if (logo && name && description) {
        formData.append("logo", logo)
        formData.append("name", name)
        formData.append("description", description)
      }

      try {
        if (brand) {
          const { id } = brand
          dispatch(patchBrand({ id, formData }))
        } else {
          dispatch(createNewBrand(formData))
        }

        setImage(null)
        resetForm()
        onClose()
      } catch (error) {
        alert(error)
      }
    },
    isToggler: false,
    btnName: brand ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<IBrandsInitialValues> {...addCategoryForm} />
}

export default BrandManagementForm
