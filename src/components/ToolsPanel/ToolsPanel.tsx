import { FC } from "react";
import s from "./ToolsPanel.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Filter from "src/components/Filter/Filter";
import type { FilterProps } from "src/components/Filter/Filter";
import Actions from "../Actions/Actions";
import type { ActionsProps } from "src/components/Actions/Actions";
import ExportToFile from "../ExportToDocument/ExportToFile";
import RowsOnPageFilter from "src/components/RowsOnPageFilter/RowsOnPageFilter";
import type { RowsProps } from "src/components/RowsOnPageFilter/RowsOnPageFilter";

type ToolsPanelProps = {
  filterOptions: FilterProps;
  actionOptions: ActionsProps;
  rowsOptions: RowsProps;
};

const ToolsPanel: FC<ToolsPanelProps> = ({
  filterOptions,
  actionOptions,
  rowsOptions,
}) => {
  return (
    <>
      <SearchInput />
      <div className={s.tools}>
        <div className={s.leftSideTools}>
          <Filter {...filterOptions} />
          <Actions {...actionOptions} />
          <ExportToFile />
        </div>
        <RowsOnPageFilter {...rowsOptions} />
      </div>
    </>
  );
};

export default ToolsPanel;
