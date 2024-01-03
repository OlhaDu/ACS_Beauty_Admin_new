import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export interface IVioletButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
