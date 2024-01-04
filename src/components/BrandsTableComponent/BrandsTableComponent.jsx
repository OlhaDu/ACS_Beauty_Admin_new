import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Paper,
} from "@mui/material";
import styles from "./BrandsTableComponent.module.scss";

const BrandsTableComponent = ({
  objectKeys,
  brands,
  currentPage,
  itemsPerPage,
}) => {
  const [checked, setChecked] = useState(new Array(brands.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(checked.every((value) => value));
  }, [checked]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setChecked(new Array(brands.length).fill(!selectAll));
  };

  const handleTableCheckboxChange = (event, index) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
  };

  return (
    <Paper className={styles.tablePaper} style={{ boxShadow: "none" }}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectAll}
                indeterminate={checked.some((value) => value) && !selectAll}
                onChange={handleSelectAll}
              />
            </TableCell>
            {objectKeys.map((item, index) => (
              <TableCell key={index} className={styles.tableCell}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map(({ logo, name, description, added }, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={checked[index]}
                  onChange={(event) => handleTableCheckboxChange(event, index)}
                />
              </TableCell>
              <TableCell className={styles.tableCell}>
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </TableCell>
              <TableCell className={styles.tableCell}>{logo}</TableCell>
              <TableCell className={styles.tableCell}>{name}</TableCell>
              <TableCell className={styles.descriptionCell}>
                {description}
              </TableCell>
              <TableCell className={styles.tableCell}>{added}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BrandsTableComponent;
