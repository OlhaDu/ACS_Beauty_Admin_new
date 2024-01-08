import React, { useState } from "react";
import styles from "./Brands.module.scss";

import AdminLayout from "src/layouts/AdminLayout";
import ExportFileIcon from "src/images/svg/ExportFileIcon";
import Select from "src/components/ToolsPanel/Select/Select";
import Button from "src/components/VioletButton/VioletButton";
import ModalWindow from "src/components/ModalWindow/ModalWindow";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import BrandsTableComponent from "src/components/BrandsTableComponent/BrandsTableComponent";

import { temporaryBrands } from "./temporaryBrands";
import { columns } from "./columns";

const Brands: React.FC = () => {
  const exportOptions = ["Експортувати в Exel"];
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

  return (
    <AdminLayout>
      <main className={styles.main}>
        <section className={styles.main__section}>
          <div className={styles.main__title}>
            <h2 className={styles.main__title_text}>Бренди</h2>
            <Button title={"додати бренд"} />
          </div>

          <div className={styles.tools}>
            <SearchInput />
            <Select
              options={exportOptions}
              icon={<ExportFileIcon />}
              toolName={"Експортувати"}
            />
          </div>

          <BrandsTableComponent
            columns={columns}
            rows={temporaryBrands}
            setIsOpenModal={setIsOpenModal}
          />
        </section>
        <ModalWindow
          title={"ДОДАТИ БРЕНД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        />
      </main>
    </AdminLayout>
  );
};

export default Brands;
