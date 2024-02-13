import { isAxiosError } from "axios"

export const getErrorMessage = (error: unknown) => {
  let message = "Сталася помилка"

  if (isAxiosError(error)) {
    message = error.response?.data.message[0].message || error.response?.data.message

    if (message === "slug must be unique") message = "Така назва категорії вже використовується"
    if (message === "name must be unique") message = "Така назва підкатегорії вже використовується"
    if (/^категория с id \d+ не найдена$/i.test(message)) message = "Категорія не знайдена"
    if (/^подкатегория с id \d+ не найдена$/i.test(message)) message = "Підкатегорія не знайдена"
  }

  return message
}
