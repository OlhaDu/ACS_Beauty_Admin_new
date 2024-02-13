import * as Yup from "yup"
export const subCategoryFormSchema = Yup.object({
  name: Yup.string()
    .required("Обов'язкове поле")
    .min(3, "Назва має складатися не менше ніж з 3 символів")
    .max(30, "Назва не може перевищувати 30 символи"),
})
