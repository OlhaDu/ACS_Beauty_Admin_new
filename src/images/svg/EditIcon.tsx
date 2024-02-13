import { FC } from "react"
import { IIcon } from "./types"

const EditIcon: FC<IIcon> = ({ className, onClick }) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
  >
    <circle cx="26" cy="26" r="26" fill="#948AD0" />
    <path
      d="M34.71 21.0401C35.1 20.6501 35.1 20.0001 34.71 19.6301L32.37 17.2901C32 16.9001 31.35 16.9001 30.96 17.2901L29.12 19.1201L32.87 22.8701M17 31.2501V35.0001H20.75L31.81 23.9301L28.06 20.1801L17 31.2501Z"
      fill="white"
    />
  </svg>
)

export default EditIcon
