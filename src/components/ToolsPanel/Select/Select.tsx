import React, { useRef, useState } from "react";
import s from "./Select.module.scss";
import DropdownArrow from "src/images/svg/DropdownArrow";
import useOnClickOutside from "src/hooks/useOnClickOutside";

type SelectProps = {
  options: string[];
  icon: React.ReactNode;
  toolName: string;
  style?: React.CSSProperties;
};

const Select: React.FC<SelectProps> = ({ options, icon, toolName, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const ref = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(ref, handleToggle);

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className={s.container} onClick={handleToggle} style={style}>
      <div className={s.fieldContainer}>
        <div className={s.icon}>{icon}</div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        {selectedValue || toolName}
      </div>
      <div
        className={s.optionListContainer}
        style={!isOpen ? { borderTop: "none" } : {}}
      >
        {isOpen && (
          // <div>
          <ul ref={ref}>
            {options.map((option, index) => (
              <li
                className={s.option}
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Select;
