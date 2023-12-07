import { FC } from "react";

import IProps from "src/interfaces/icons";

const ReviewsIcon: FC<IProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 12H8.5L10.5 10H16M4 12V9.5L10.88 2.64C11.07 2.45 11.39 2.45 11.59 2.64L13.35 4.41C13.55 4.61 13.55 4.92 13.35 5.12L6.47 12M18 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V20L4 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 0.89 19.1 0 18 0Z"
        fill={color}
      />
    </svg>
  );
};

export default ReviewsIcon;
