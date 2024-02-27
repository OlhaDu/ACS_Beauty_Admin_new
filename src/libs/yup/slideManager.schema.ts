import * as Yup from "yup"
import { ISlidesInitialValues } from "src/types/slides"

const priorityRules = /^[1-9]\d*$/

export const slideManagerSchema = Yup.object<ISlidesInitialValues>({
  desktopBanner: Yup.mixed()
    .required("Завантажте банер")
    .test(
      "fileFormat",
      "Дозволено тільки картинки",
      value =>
        (value instanceof File &&
          value.type?.split("/")[0] === "image" &&
          value.size <= 3 * 1024 * 1024) ||
        (typeof value === "string" && value.startsWith("http"))
    ),
  mobileBanner: Yup.mixed()
    .required("Завантажте банер")
    .test(
      "fileFormat",
      "Дозволено тільки картинки",
      value =>
        (value instanceof File &&
          value.type?.split("/")[0] === "image" &&
          value.size <= 3 * 1024 * 1024) ||
        (typeof value === "string" && value.startsWith("http"))
    ),

  priority: Yup.string().required("Визначте пріорітет").matches(priorityRules, {
    message: "Введіть ціле число",
  }),
})
