import { useState, FC } from "react";
import s from "./Filter.module.scss";
import DropdownArrow from "src/images/svg/DropdownArrow";
import FilterIcon from "src/images/svg/FilterIcon";
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon";

export interface FilterProps {
  options: {
    optionName: string;
    suboptions: string[];
  }[];
}

const Filter: FC<FilterProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [expandedOptions, setExpandedOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleOptionClick = (optionName: string) => {
    setExpandedOptions((prevOptions) => {
      return { ...prevOptions, [optionName]: !prevOptions[optionName] };
    });
  };

  const handleSuboptionClick = (optionName: string, suboption: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions };

      if (newOptions[optionName] === suboption) {
        delete newOptions[optionName];
      } else {
        newOptions[optionName] = suboption;
      }
      return newOptions;
    });
  };

  return (
    <div className={s.container}>
      <div className={s.fieldContainer} onClick={handleToggle}>
        <div className={s.icon}>
          <FilterIcon />
        </div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        <div className={s.heading}> {"Фільтрувати"}</div>
      </div>

      <div
        className={s.optionListContainer}
        style={!isOpen ? { borderTop: "none" } : {}}
      >
        {isOpen && (
          <>
            {options.map((option, idx) => (
              <ul key={idx}>
                <div
                  onClick={() => handleOptionClick(option.optionName)}
                  className={`${
                    idx === options.length - 1
                      ? `${s.lastOption} ${s.option}`
                      : s.option
                  }`}
                >
                  {option.optionName}

                  <span
                    style={{
                      transform: expandedOptions[option.optionName]
                        ? "rotate(180deg)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    <ArrowToBottomIcon size="24" />
                  </span>
                </div>

                {expandedOptions[option.optionName] && (
                  <ul>
                    {option.suboptions.map((suboption, subIdx) => (
                      <li
                        key={subIdx}
                        onClick={() =>
                          handleSuboptionClick(option.optionName, suboption)
                        }
                        className={`${
                          subIdx === option.suboptions.length - 1
                            ? `${s.lastSuboption} ${s.suboption}`
                            : s.suboption
                        } ${
                          selectedOptions[option.optionName] === suboption
                            ? s.clicked
                            : ""
                        }`}
                      >
                        {suboption}{" "}
                        {selectedOptions[option.optionName] === suboption &&
                          "✔"}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
