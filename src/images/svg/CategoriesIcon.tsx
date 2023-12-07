import { FC } from "react";

import IProps from "src/interfaces/icons";

const CategoriesIcon: FC<IProps> = ({ color }) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 11.5V19.5H0V11.5H8ZM9 0L14.5 9H3.5L9 0ZM14.5 11C17 11 19 13 19 15.5C19 18 17 20 14.5 20C12 20 10 18 10 15.5C10 13 12 11 14.5 11Z"
        fill={color}
      />
    </svg>
  );
};

export default CategoriesIcon;
