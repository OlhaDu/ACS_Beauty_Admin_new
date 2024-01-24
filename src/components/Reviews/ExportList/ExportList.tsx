import React, { useState } from "react";
import ArrowIcon from "src/assets/menu-arrow.svg";
import ExportIcon from "src/assets/file-export.svg";
import s from "../ReviewsList/ReviewsList.module.scss";

const ExportList = () => {
  const [exportOpen, setExportOpen] = useState(false);

  const toggleExport = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setExportOpen(!exportOpen);
  };

  return (
    <>
      <ExportIcon />
      Експортувати
      <span
        className={`${s.menu_arrow} ${exportOpen ? s.menu_arrow_rotated : ""}`}
        onClick={toggleExport}
      >
        <ArrowIcon />
      </span>
    </>
  );
};
export default ExportList;
