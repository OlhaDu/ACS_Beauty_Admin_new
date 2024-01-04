import { useState } from "react";
import styles from "./Brands.module.scss";

import AdminLayout from "src/layouts/AdminLayout";
import Select from "src/components/ToolsPanel/Select/Select";
import Button from "src/components/VioletButton/VioletButton";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import BrandsTableComponent from "src/components/BrandsTableComponent/BrandsTableComponent";

import FilterIcon from "src/images/svg/FilterIcon";
import ActionsIcon from "src/images/svg/ActionsIcon";
import RowListIcon from "src/images/svg/RowListIcon";
import ExportFileIcon from "src/images/svg/ExportFileIcon";

import { temporaryBrands } from "./temporaryBrands";
import CustomPagination from "src/components/CustomPagination";

const Brands = () => {
  const filteringOptions = ["Option 1", "Option 2", "Option 3"];
  const actionOptions = ["Редагувати", "Видалити"];
  const exportOptions = ["Option 1", "Option 2", "Option 3"];
  const paginationOptions = [10, 20, 30];

  const objectKeys = ["№", "Логотип", "Назва", "Опис", "Додано"];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(paginationOptions[0]);

  const paginateBrandsArr = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };

  return (
    <AdminLayout>
      <main className={styles.main}>
        <section className={styles.main__section}>
          <div className={styles.main__title}>
            <h2 className={styles.main__title_text}>Бренди</h2>
            <Button title={"додати бренд"} />
          </div>
          <div className={styles.main__brands_search}>
            <div className={styles.features}>
              <SearchInput />
              <div className={styles.tools}>
                <div className={styles.tools__actions}>
                  <Select
                    options={filteringOptions}
                    icon={<FilterIcon />}
                    toolName={"Фільтрувати"}
                  />
                  <Select
                    options={actionOptions}
                    icon={<ActionsIcon />}
                    toolName={"Дії"}
                  />
                  <Select
                    options={exportOptions}
                    icon={<ExportFileIcon />}
                    toolName={"Експортувати"}
                  />
                </div>
                <Select
                  options={paginationOptions}
                  icon={<RowListIcon />}
                  toolName={`Рядків на сторінці: ${itemsPerPage}`}
                  style={{ width: "261px" }}
                  itemsPerPage={setItemsPerPage}
                />
              </div>
            </div>
          </div>

          <BrandsTableComponent
            objectKeys={objectKeys}
            brands={paginateBrandsArr(
              temporaryBrands,
              currentPage,
              itemsPerPage
            )}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />

          <CustomPagination
            rowsPerPage={itemsPerPage}
            totalItems={temporaryBrands.length}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </AdminLayout>
  );
};

export default Brands;
