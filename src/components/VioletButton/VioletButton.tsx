import { FC } from "react";
import s from "./VioletButton.module.scss";
import { IVioletButtonProps } from "src/types";

const Button: FC<IVioletButtonProps> = ({ title, onClick }) => (
  <button className={s.button} onClick={onClick}>
    {title}
  </button>
);

export default Button;
