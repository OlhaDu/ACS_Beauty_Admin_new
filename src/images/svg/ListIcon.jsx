import React from "react";

const ListIcon= ({ color }: {color: string}) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10C0.89 10 0 10.89 0 12V16C0 17.11 0.89 18 2 18H6C7.11 18 8 17.11 8 16V12C8 10.89 7.11 10 6 10M6.2 11.5L7.26 12.55L3.27 16.5L0.74 13.95L1.81 12.9L3.28 14.39M2 0C0.89 0 0 0.89 0 2V6C0 7.11 0.89 8 2 8H6C7.11 8 8 7.11 8 6V2C8 0.89 7.11 0 6 0M2 2H6V6H2M10 2H20V4H10M10 16V14H20V16M10 8H20V10H10V8Z"
        fill={color}
      />
    </svg>
  );
};

export default ListIcon;
