import { FC } from "react";
import s from "./VioletButton.module.scss";
import { IVioletButtonProps } from "src/types";

const Button: FC<IVioletButtonProps> = ({
  title,
  type,
  disabled,
  onClick,
  className,
}) => (
  <button
    className={`${s.button} ${className}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {title}
  </button>
);

export default Button;
