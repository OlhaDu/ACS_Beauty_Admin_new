import React, { FC } from "react"

interface IProps {
  width?: number
  height?: number
  fill?: string
}

const ExportIcon: FC<IProps> = ({ width = 24, height = 24, fill = "#5C5E60" }) => {
  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m-1 1.5L18.5 9H13m-4.07 3.22H16v7.07l-2.12-2.12L11.05 20l-2.83-2.83 2.83-2.82"
      />
    </svg>
  )
}

export default ExportIcon
