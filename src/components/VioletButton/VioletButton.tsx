import styles from "./VioletButton.module.scss";

interface IVioletButtonProps {
  buttonText: string;
  radius: string;
  onClickFunction: () => void;
  type: "button" | "submit" | "reset";
  disabled: boolean;
}

const VioletButton = ({
  buttonText,
  radius,
  onClickFunction,
  type,
  disabled,
}: IVioletButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={styles.buttonContainer}
      style={{ borderRadius: radius }}
      onClick={onClickFunction}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default VioletButton;
