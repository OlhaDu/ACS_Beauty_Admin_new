import * as Yup from "yup"
import { IBrandsInitialValues } from "src/types/brands"

export const brandManagerSchema = Yup.object<IBrandsInitialValues>({
  name: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Назва має складатися не менше ніж з 3 символів")
    .max(30, "Назва не може перевищувати 30 символів"),
  description: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Опис має складатися не менше ніж з 3 символів")
    .max(220, "Опис не може перевищувати 220 символів"),
  logo: Yup.mixed()
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
})
