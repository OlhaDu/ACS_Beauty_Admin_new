import React, {useState} from "react";
import styles from "./Select.module.scss";
// import DropdownArrow from "../../../svgs/DropdownArrow";
import DropdownArrow from "src/images/svg/DropdownArrow";

interface SelectProps {
  options: string[];
  toolName: string;
  icon: React.ReactElement;
  style?: React.CSSProperties;
}
const Select: React.FC<SelectProps> = ({ options, toolName, icon, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} onClick={handleToggle} style={style}>
      <div className={styles.fieldContainer}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.dropdownArrow}>
          <DropdownArrow />
        </div>
        {selectedValue || toolName}
      </div>
      <div
        className={styles.optionListContainer}
        style={!isOpen ? { borderTop: "none" } : {}}
      >
        {isOpen && (
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
