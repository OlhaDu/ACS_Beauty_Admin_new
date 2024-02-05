import { FC } from "react"
import s from "./WhiteButton.module.scss"
import { IVioletButtonProps } from "src/types/categories"

const Button: FC<IVioletButtonProps> = ({ title }) => <button className={s.button}>{title}</button>

export default Button
