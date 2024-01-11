import { FC } from "react"
import { IBorder } from "src/types"
import s from "./Border.module.scss"
import classNames from "classnames"

const Border: FC<IBorder> = ({ children, border, className }) => {
  const borderClasses = classNames(s[border], className)

  return <div className={borderClasses}>{children}</div>
}

export default Border
