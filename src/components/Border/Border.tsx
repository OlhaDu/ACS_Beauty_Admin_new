import { FC } from "react"
import s from "./Border.module.scss"
import cn from "classnames"
import { IBorder } from "src/types/common"

const Border: FC<IBorder> = ({ children, border, className }) => {
  const borderClasses = cn(s[border], className)

  return <div className={borderClasses}>{children}</div>
}

export default Border
