import React from "react"
import { Field, ErrorMessage } from "formik"
import styles from "../Form.module.scss"
import Eye from "src/pages/Profile/Form/Password/Eye/Eye"

interface PasswordProps {
  field: {
    name: string
    value: string
  }
  title: string
  text: string
  onClickShowPass: (show: boolean) => void
  onShowPass: boolean
  errorName: string
}

const Password: React.FC<PasswordProps> = ({
  text,
  onClickShowPass,
  onShowPass,
  errorName,
  field,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.regLabel}>{text}</label>
      <Field
        className={styles.signUpField}
        title="Пароль має містити від 8 до 15 символів (латинські літери нижнього, верхнього регістру, цифри, спецсимволи)"
        {...field}
      />
      <div className={styles.eye}>
        <Eye onClickShowPass={() => onClickShowPass(!onShowPass)} onShowPass={onShowPass} />
      </div>
      <ErrorMessage className={styles.error} name={errorName} component="div" />
    </div>
  )
}

export default Password
