import { FC } from "react";
import { IBorder } from "src/types";
import s from "./Border.module.scss";

const Border: FC<IBorder> = ({ children, border, className }) => (
  <div className={`${s[border]} ${className}`}>{children}</div>
);

export default Border;
