import { useState } from "react";
import styles from "./CustomPagination.module.scss";

import IconButton from "@mui/material/IconButton";
import ArrowToRight from "src/images/svg/ArrowToRight";

const CustomPagination = ({ rowsPerPage, totalItems, setCurrentPage }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.pagination_container}>
      <IconButton
        onClick={() => handleChangePage(page - 1)}
        disabled={page === 1}
      >
        <ArrowToRight
          iconSize={24}
          className={
            page !== 1 ? styles.arrow_to__left : styles.arrow_to__left__disabled
          }
        />
      </IconButton>

      <span className={styles.pagination_info}>{`${
        (page - 1) * rowsPerPage + 1
      }-${Math.min(page * rowsPerPage, totalItems)} з ${totalItems} `}</span>

      <IconButton
        onClick={() => handleChangePage(page + 1)}
        disabled={page >= Math.ceil(totalItems / rowsPerPage)}
      >
        <ArrowToRight
          iconSize={24}
          className={
            page >= Math.ceil(totalItems / rowsPerPage)
              ? styles.arrow_to__right__disabled
              : styles.arrow_to__right
          }
        />
      </IconButton>
    </div>
  );
};

export default CustomPagination;
