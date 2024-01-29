import React, { useState } from "react"
import { FormikHelpers } from "formik"

import { newsManagerSchema } from "src/libs/yup"
import { useAppDispatch } from "src/redux/store"
import { INews, INewsInitialValues } from "src/types/news"
import { createNewNews, patchNews } from "src/redux/news/operations"

import s from "./NewsManagementForm.module.scss"
import AddLogoInput from "src/components/AddLogoInput"
import FormGenerator from "src/components/FormGenerator"

interface IProps {
  news?: INews
  onClose: () => void
}

const NewsManagementForm: React.FC<IProps> = ({ news, onClose }) => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState(news?.banner || null)

  const addNewsForm = {
    initialValues: {
      banner: image,
      title: news?.title || "",
      text: news?.text || "",
    },
    validationSchema: newsManagerSchema,
    groups: [
      {
        fields: [
          {
            component: <AddLogoInput fields="banner" name={news?.title || ""} logo={image} />,
          },
        ],
      },
      {
        fields: [
          { name: "title", label: "Заголовок" },
          {
            name: "text",
            label: "Опис",
            as: "textarea",
            className: s.brand_form__textarea,
          },
        ],
      },
    ],
    onSubmit: async (
      value: INewsInitialValues,
      { resetForm }: FormikHelpers<INewsInitialValues>
    ) => {
      const formData = new FormData()
      const { banner, title, text } = value

      if (banner && title && text) {
        formData.append("banner", banner)
        formData.append("title", title)
        formData.append("text", text)
      }

      try {
        if (news) {
          const { id } = news
          dispatch(patchNews({ id, formData }))
        } else {
          dispatch(createNewNews(formData))
        }

        setImage(null)
        resetForm()
        onClose()
      } catch (error) {
        alert(error)
      }
    },
    isToggler: false,
    btnName: news && "РЕДАГУВАТИ",
  }

  return <FormGenerator<INewsInitialValues> {...addNewsForm} />
}

export default NewsManagementForm
