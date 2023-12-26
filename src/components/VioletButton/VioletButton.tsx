import s from "./VioletButton.module.scss";

const Button = ({ buttonText }: { buttonText: string }) => (
  <button className={s.button}>{buttonText}</button>
);

export default Button;
