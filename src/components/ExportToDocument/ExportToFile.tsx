import { useState, FC } from "react";
import s from "./ExportToFile.module.scss";
import DropdownArrow from "src/images/svg/DropdownArrow";
import ExportFileIcon from "src/images/svg/ExportFileIcon";

const ExportToFile: FC = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.container}>
      <div
        className={s.fieldContainer}
        onClick={handleToggle}
        style={isOpen ? { borderBottom: "none" } : {}}
      >
        <div className={s.icon}>
          <ExportFileIcon />
        </div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        <div className={s.heading}>Експортувати</div>
      </div>
      {isOpen && (
        <div
          className={s.optionListContainer}
          style={!isOpen ? { borderTop: "none" } : {}}
        >
          <></>
        </div>
      )}
    </div>
  );
};

export default ExportToFile;
