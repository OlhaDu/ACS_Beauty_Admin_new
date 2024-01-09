import React from "react";
import styles from "./ExportButton.module.scss";
import ExportFileIcon from "../../../images/svg/ExportFileIcon.jsx";
import * as XLSX from "xlsx";

interface Column {
  field: string;
  headerName: string;
  type?: string;
  width: number;
}

interface Row {
  [key: string]: number | string;
}

interface DataTableProps {
  columns: Column[];
  rows: Row[];
}
const ExportButton: React.FC<DataTableProps> = ({ columns, rows }) => {
  const handleOnClick = () => {
    const rowsData = rows.map((row) => columns.map((col) => row[col.field]));

    const ws = XLSX.utils.json_to_sheet([columns.map((col) => col.headerName), ...rowsData], { skipHeader: true });

    const colWidths = columns.map((col, colIndex) => {
      const maxContentLength = Math.max(
          col.headerName.length,
          ...rows.map((row) => String(row[col.field]).length)
      );
      return { wch: maxContentLength + 2 }; // Adding extra space for better readability
    });
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "exported_data.xlsx");
  };


  return (
    <button className={styles.container} onClick={handleOnClick}>
      <div className={styles.fieldContainer}>
        <div className={styles.icon}><ExportFileIcon /></div>
        <div>Експортувати</div>
      </div>
    </button>
  );
};

export default ExportButton;
