import React, { FC } from "react";

interface ChangeIconProps {
    width?: number;
    height?: number;
    fill?: string;
   
  }

const ChangeIconTS: FC<ChangeIconProps> = ({
    width = 24,
    height = 24,
    fill = "white",
}) =>{

  return (
    <svg
    width = {width}
    height = {height}
    fill = "none"
      xmlns="http://www.w3.org/2000/svg"
    >
     {/* <circle cx="26" cy="26" r="26" fill="#948AD0" /> */}
      <path
        d="M17.71 5.04006C18.1 4.65006 18.1 4.00006 17.71 3.63006L15.37 1.29006C15 0.900059 14.35 0.900059 13.96 1.29006L12.12 3.12006L15.87 6.87006M0 15.2501V19.0001H3.75L14.81 7.93006L11.06 4.18006L0 15.2501Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChangeIconTS;