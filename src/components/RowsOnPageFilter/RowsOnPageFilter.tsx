import { useState, FC } from "react";
import s from "./RowsOnPageFilter.module.scss";
import DropdownArrow from "src/images/svg/DropdownArrow";
import RowListIcon from 'src/images/svg/RowListIcon';

interface Row {
    rowName: string;
    handler: () => void;
  }
  
  export interface RowsProps {
    rows: Row[];
  }

const RowsOnPageFilter: FC<RowsProps> = ({ rows }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (row: Row) => {
    setSelectedRow(row);
  };

  return (
    <div className={s.container}>

      <div className={s.fieldContainer} onClick={handleToggle}>
        <div className={s.icon}>
          <RowListIcon />
        </div>
        <div className={s.dropdownArrow}>
          <DropdownArrow />
        </div>
        <div className={s.heading}>
          {"Рядків на сторінці"} {selectedRow ? `: ${selectedRow.rowName}` : ""}
        </div>
      </div>

      <div className={s.optionListContainer} style={!isOpen ? { borderTop: "none" } : {}}>
        {isOpen && (

          <ul className={s.list}>
            {rows.map((row, idx) => (

              <li
                key={idx}
                className={`${s.option} ${selectedRow === row ? s.selected : ""}`}
                onClick={() => handleActionClick(row)}
              >
                {row.rowName} {selectedRow === row && "✔"}
              </li>
              
            ))}
          </ul>

        )}
      </div>

    </div>
  );
};

export default RowsOnPageFilter;