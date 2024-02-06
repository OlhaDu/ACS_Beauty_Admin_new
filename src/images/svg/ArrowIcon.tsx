import React, { FC } from "react";

interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  rotated?: boolean;   
}

const ArrowIcon: FC<IProps> = ({
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
        id="Vector" d="M7 10L12 15L17 10H7Z" 
      />
    </svg>
  );
};

export default ArrowIcon;