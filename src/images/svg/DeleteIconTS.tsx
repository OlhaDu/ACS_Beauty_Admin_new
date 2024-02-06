import React, { FC } from "react"

interface DeleteIconProps {
  width: number
  height: number
  fill: string
}

const DeleteIcon: FC<DeleteIconProps> = ({ width = 52, height = 52, fill = "none" }) => {
  return (
    <svg width={width} height={height} fill="black" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33 18H29.5L28.5 17H23.5L22.5 18H19V20H33M20 33C20 33.5304 20.2107 34.0391 20.5858 34.4142C20.9609 34.7893 21.4696 35 22 35H30C30.5304 35 31.0391 34.7893 31.4142 34.4142C31.7893 34.0391 32 33.5304 32 33V21H20V33Z"
        fill={fill}
      />
    </svg>
  )
}

export default DeleteIcon
