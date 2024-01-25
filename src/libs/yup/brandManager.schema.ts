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
    .max(220, "Опис не може перевищувати 220 символи"),
  logo: Yup.mixed()
    .required("Завантажте банер")
    .test("isFileOrString", "Дозволено тільки File або рядок", value => {
      if (value instanceof File) {
        if (value.type?.split("/")[0] !== "image") {
          throw new Yup.ValidationError("Дозволено тільки картинки", value, "fileFormat")
        }

        if (value.size > 3 * 1024 * 1024) {
          throw new Yup.ValidationError("Розмір файла не більше 3Мб", value, "fileSize")
        }
      } else if (typeof value === "string") {
        if (!(value.startsWith("http") || value.startsWith("https"))) {
          throw new Yup.ValidationError("Це не є посиланням на фото", value, "invalidLink")
        }
      } else {
        throw new Yup.ValidationError("Невідомий тип значення", value, "unknownType")
      }

      return true
    }),
})
