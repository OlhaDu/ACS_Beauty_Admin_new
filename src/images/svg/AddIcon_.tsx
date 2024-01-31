import { FC } from "react"
import { IIcon } from "./types"

const AddIcon: FC<IIcon> = ({ className, onClick }) => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <circle cx="26" cy="26" r="26" />
      <path d="M33 27H27V33H25V27H19V25H25V19H27V25H33V27Z" />
    </svg>
  )
}

export default AddIcon
