import React, { FC } from "react";

interface IProps {
  width?: number;
  height?: number
  fill?: string;
  stroke?: string;
}

const StarIcon: FC<IProps> = ({
  width = 24,
  height = 24,
  fill = "white",
  stroke= "rgba(0, 0, 0, 0.1)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"
      />
    </svg>
  );
};

export default StarIcon;