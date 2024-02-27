import { useState } from "react"
import { FormikHelpers } from "formik"

import { useAppDispatch } from "src/redux/hooks"
import { ISlide, ISlidesInitialValues } from "src/types/slides"
import { slideManagerSchema } from "src/libs/yup/slideManager.schema"
import { createNewSlide, patchSlide } from "src/redux/slides/operations"

import AddBannerInput from "../AddBannerInput/AddBannerInput"
import FormGenerator from "src/components/FormGenerator"

interface IProps {
  slide?: ISlide
  onClose: () => void
}

const SlideManagementForm: React.FC<IProps> = ({ slide, onClose }) => {
  const dispatch = useAppDispatch()
  const [desktopBanner, setDesktopBanner] = useState(slide?.desktopBanner || null)
  const [mobileBanner, setMobileBanner] = useState(slide?.mobileBanner || null)

  const addCategoryForm = {
    initialValues: {
      desktopBanner: desktopBanner,
      mobileBanner: mobileBanner,
      priority: slide?.priority || "",
    },
    validationSchema: slideManagerSchema,
    groups: [
      {
        fields: [
          {
            component: <AddBannerInput slideBanner={desktopBanner} />,
          },
          {
            component: <AddBannerInput slideBanner={mobileBanner} />,
          },
        ],
      },
      {
        fields: [{ name: "priority", label: "priority" }],
      },
    ],
    onSubmit: async (
      value: ISlidesInitialValues,
      { resetForm }: FormikHelpers<ISlidesInitialValues>
    ) => {
      const formData = new FormData()
      const { desktopBanner, mobileBanner, priority } = value

      if (desktopBanner && mobileBanner && priority) {
        formData.append("desktopBanner", desktopBanner)
        formData.append("mobileBanner", mobileBanner)
        formData.append("priority", priority)
      }

      try {
        if (slide) {
          const { id } = slide
          dispatch(patchSlide({ id, formData }))
        } else {
          dispatch(createNewSlide(formData))
        }

        setDesktopBanner(null)
        setMobileBanner(null)
        resetForm()
        onClose()
      } catch (error) {
        alert(error)
      }
    },
    isToggler: false,
    btnName: slide ? "РЕДАГУВАТИ" : "ДОДАТИ",
  }

  return <FormGenerator<ISlidesInitialValues> {...addCategoryForm} />
}

export default SlideManagementForm
