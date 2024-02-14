import * as Yup from "yup"
import { INoveltyInitialValues } from "src/types/news"

export const newsManagerSchema = Yup.object<INoveltyInitialValues>({
  title: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Заголовок має складатися не менше ніж з 3 символів")
    .max(30, "Заголовок не може перевищувати 30 символів"),
  text: Yup.string()
    .required("Обов`язкове поле")
    .min(3, "Текст має складатися не менше ніж з 3 символів")
    .max(220, "Текст не може перевищувати 220 символів"),
  banner: Yup.mixed()
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
