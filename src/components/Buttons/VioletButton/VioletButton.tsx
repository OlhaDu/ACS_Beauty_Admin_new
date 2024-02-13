import cn from "classnames"
import { FC } from "react"
import s from "./VioletButton.module.scss"
import { IVioletButtonProps } from "src/types/categories"

const Button: FC<IVioletButtonProps> = ({ title, type, disabled, onClick, className }) => {
  const btnClasses = cn(s.button, className)

  return (
    <button className={btnClasses} onClick={onClick} type={type} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button
