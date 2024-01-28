import React, { useEffect } from "react"
import styles from "./Toast.module.scss"

interface SuccessMessageProps {
  isSubmitted: boolean
  isError: boolean
  closeMessage: () => void
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ isSubmitted, isError, closeMessage }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeMessage()
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isSubmitted, closeMessage])

  return (
    <div
      className={`${styles.popup} ${isSubmitted ? styles.popupEnter : styles.popupExit} ${
        isError ? styles.bgRed : styles.bgGreen
      }`}
    >
      <p className={styles.toastText}>
        {isError ? "Відбулась помилка при оновленні даних" : "Ваши дані успішно оновлені!"}
      </p>
    </div>
  )
}

export default SuccessMessage
