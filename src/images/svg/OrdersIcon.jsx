import React from "react";

const OrdersIcon = ({ color }: {color: string}) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20L1.5 18.5L3 20L4.5 18.5L6 20L7.5 18.5L9 20L10.5 18.5L12 20L13.5 18.5L15 20L16.5 18.5L18 20V0L16.5 1.5L15 0L13.5 1.5L12 0L10.5 1.5L9 0L7.5 1.5L6 0L4.5 1.5L3 0L1.5 1.5L0 0M15 7H3V5H15M15 11H3V9H15M15 15H3V13H15V15Z"
        fill={color}
      />
    </svg>
  );
};

export default OrdersIcon;
