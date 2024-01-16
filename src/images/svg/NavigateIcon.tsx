import React, { FC } from "react";

interface NavigateIconProps {
  width?: number;
  height?: number;
  fill?: string;
  rotated?: boolean; 
}

const NavigateIcon: FC<NavigateIconProps> = ({
  width = 24,
  height = 24,
  fill = "#5C5E60",
  rotated = false,
  
}) => {
    const rotationStyle = rotated ? { transform: "rotate(180deg)" } : {};
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      style={rotationStyle}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <circle cx="26" cy="26" r="26" fill="#948AD0" /> */}
      <path
        fill={fill}
        d="M7.41 15.705 6 14.295l6-6 6 6-1.41 1.41-4.59-4.58-4.59 4.58Z"
      />
    </svg>
  );
};

export default NavigateIcon;
