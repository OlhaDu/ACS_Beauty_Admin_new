import { FC } from "react"
import { IIcon } from "./types"

const ArrowIcon: FC<IIcon> = ({ iconSize, className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize || 48}
      height={iconSize || 48}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M33.18 16.59L36 19.41L24 31.41L12 19.41L14.82 16.59L24 25.75L33.18 16.59Z"
        fill="#5C5E60"
      />
    </svg>
  )
}

export default ArrowIcon
