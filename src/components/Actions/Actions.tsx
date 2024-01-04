import { useState, FC } from "react";
import s from "./Actions.module.scss";
import DropdownArrow from "src/images/svg/DropdownArrow";
import ActionsIcon from "src/images/svg/ActionsIcon";

interface Action {
  actionName: string;
  handler: () => void;
}

export interface ActionsProps {
  actions: Action[];
}

const Actions: FC<ActionsProps> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: Action) => {
    if (action.handler) {
      action.handler();
    }
  };

  return (
    <div className={s.container}>
      <div
        className={s.fieldContainer}
        onClick={handleToggle}
        style={isOpen ? { borderBottom: "none" } : {}}
      >
        <div className={s.icon}>
          <ActionsIcon />
        </div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        <div className={s.heading}>Дії</div>
      </div>
      {isOpen && (
        <div
          className={s.optionListContainer}
          style={!isOpen ? { borderTop: "none" } : {}}
        >
          <>
            <ul className={s.list}>
              {actions.map((action, idx) => (
                <li
                  key={idx}
                  className={s.option}
                  onClick={() => handleActionClick(action)}
                >
                  {action.actionName}
                </li>
              ))}
            </ul>
          </>
        </div>
      )}
    </div>
  );
};

export default Actions;
