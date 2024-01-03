import React from "react";
import styles from "./ToolsPanel.module.scss";
import SearchInput from "./SearchInput/SearchInput";
import Select from "./Select/Select";
import FilterIcon from "../../images/svg/FilterIcon";
import ActionsIcon from "../../images/svg/ActionsIcon";
import ExportFileIcon from "../../images/svg/ExportFileIcon";
import RowListIcon from "../../images/svg/RowListIcon";

const ToolsPanel = () => {
  const options = ["Option 1", "Option 2", "Option 3"];


  return (
    <div>
      <SearchInput />
      <div className={styles.tools}>
        <section>
          <Select
            options={options}
            icon={<FilterIcon />}
            toolName={"Фільтрувати"}
          />
          <Select options={options} icon={<ActionsIcon />} toolName={"Дії"} />
          <Select
            options={options}
            icon={<ExportFileIcon />}
            toolName={"Експортувати"}
          />
        </section>
        <Select
          options={options}
          icon={<RowListIcon />}
          toolName={"Рядків на сторінці: 10"}
          style={{ width: "261px" }}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
