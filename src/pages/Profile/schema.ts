import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;:?'"`~()_=+[\]{}\-.,<>|/\\])[a-zA-Z0-9!@#$%^&*;:?'"`~()_=+[\]{}\-.,|<>/\\]{8,15}$/;
const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const nameRules = /^([a-zA-Z\u0400-\u04FF][a-zA-Z\u0400-\u04FF-'./ ]*)$/;
const phoneRules =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const profileSchema = () => {
  return yup.object().shape({
    firstName: yup
      .string()
      .matches(nameRules, {
        message: "Введіть ім`я латиницею або кирилицею!",
      })
      .min(2, "Введіть ім`я від 2 до 15 символів")
      .max(15, "Введіть ім`я від 2 до 15 символів"),
    lastName: yup
      .string()
      .matches(nameRules, {
        message: "Введіть прізвище латиницею або кирилицею!",
      })
      .min(2, "Введіть ім`я від 2 до 15 символів")
      .max(15, "Введіть ім`я від 2 до 15 символів"),
    phone: yup
      .string()
      .matches(phoneRules, {
        message: "Введіть коректний номер телефону",
      })
      .min(9, "Введіть коректний номер телефону"),
    email: yup
      .string()
      .email("Введіть коректну e-mail адресу")
      .matches(emailRules, {
        message: "Введіть коректну e-mail адресу",
      }),
    password: yup
      .string()
      .label("Введіть коректний пароль")
      .min(8, "Введіть коректний пароль")
      .max(15, "Введіть коректний пароль")
      .matches(passwordRules, {
        message: "Введіть коректний пароль",
      }),
    newpassword: yup
      .string()
      .label("Введіть коректний пароль")
      .min(8, "Введіть коректний пароль")
      .max(15, "Введіть коректний пароль")
      .matches(passwordRules, {
        message: "Введіть коректний пароль",
      }),
    confirmpass: yup
      .string()
      .label("Підтвердження паролю")
      .oneOf([yup.ref("password"), ""], "Пароль має збігатись"),
    avatar: yup
      .mixed()
      .nullable()
      .test("fileSize", "Розмір фото не має перевищувати 10 Мб", (value) => {
        if (!value) return true;
        return (value as File).size <= 10 * 1024 * 1024;
      })
      .test("fileFormat", "Формати фото: png, jpg, jpeg, gif", (value) => {
        if (!value) return true;
        const acceptedFormats = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
        ];
        return acceptedFormats.includes((value as File).type);
      }),
  });
};
