import { FC } from "react"
import { IIcon } from "./types"

const DeleteIcon: FC<IIcon> = ({ onClick, className }) => {
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
      <circle cx="26" cy="26" r="26" fill="#948AD0" />
      <path
        d="M33 18H29.5L28.5 17H23.5L22.5 18H19V20H33M20 33C20 33.5304 20.2107 34.0391 20.5858 34.4142C20.9609 34.7893 21.4696 35 22 35H30C30.5304 35 31.0391 34.7893 31.4142 34.4142C31.7893 34.0391 32 33.5304 32 33V21H20V33Z"
        fill="white"
      />
    </svg>
  )
}

export default DeleteIcon
