import React, { useState } from "react";
import ArrowIcon from "src/images/svg/ArrowIcon";
import ExportIcon from "src/images/svg/ExportIcon";
import s from "src/components/Reviews/FilterProperties/FilterProperties.module.scss";

const ExportList = () => {
  const [exportOpen, setExportOpen] = useState(false);

  const toggleExport = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setExportOpen(!exportOpen);
  };

  return (
    <div className={s.menu_filter}>
      <ExportIcon />
      Експортувати
      <span
        className={s.menu_arrow} 
        onClick={toggleExport}
      >
        <ArrowIcon  rotated={exportOpen}/>
      </span>
    </div>
  );
};
export default ExportList;
