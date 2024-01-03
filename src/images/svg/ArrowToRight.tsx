import { IArrowToRight } from "src/types";

const ArrowToRight = ({ iconSize, className }: IArrowToRight) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize || 48}
      height={iconSize || 48}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        d="M16.5902 33.18L19.4102 36L31.4102 24L19.4102 12L16.5902 14.82L25.7502 24L16.5902 33.18Z"
        fill="#5C5E60"
      />
    </svg>
  );
};

export default ArrowToRight;
