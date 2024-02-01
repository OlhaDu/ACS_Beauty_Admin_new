import * as Yup from "yup"
export const categoryFormSchema = Yup.object({
  name: Yup.string()
    .required("Обов'язкове поле")
    .min(3, "Назва має складатися не менше ніж з 3 символів")
    .max(30, "Назва не може перевищувати 30 символи"),
  description: Yup.string()
    .required("Обов'язкове поле")
    .min(3, "Посилання має складатися не менше ніж з 3 символів")
    .max(64, "Посилання не може перевищувати 64 символи"),
  image: Yup.mixed()
    .required("Обов'язкове поле")
    .test(
      "fileFormat",
      "Дозволено тільки картинки",
      file => file instanceof File && file.type.split("/")[0] === "image"
    )
    .test(
      "fileSize",
      "Розмір файла не більше 3Мб",
      file => file instanceof File && file.size <= 3 * 1024 * 1024
    ),
})