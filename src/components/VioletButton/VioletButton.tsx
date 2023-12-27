import { FC } from "react";
import s from "./VioletButton.module.scss";
import { IVioletButtonProps } from "src/types";

const Button: FC<IVioletButtonProps> = ({ title }) => (
  <button className={s.button}>{title}</button>
);

export default Button;
