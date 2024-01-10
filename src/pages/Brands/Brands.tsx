import React, { useState } from "react";
import styles from "./Brands.module.scss";

import AdminLayout from "src/layouts/AdminLayout";
import ExportFileIcon from "src/images/svg/ExportFileIcon";
import Select from "src/components/ToolsPanel/Select/Select";
import ModalWindow from "src/components/ModalWindow/ModalWindow";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import BrandManagementForm from "src/components/BrandsComponents/BrandManagementForm";
import BrandsTableComponent from "src/components/BrandsComponents/BrandsTableComponent/";

import { temporaryBrands } from "./temporaryBrands";
import { columns } from "./columns";

const Brands: React.FC = () => {
  const exportOptions = ["Експортувати в Exel"];
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <AdminLayout>
      <main className={styles.brand}>
        <section className={styles.brand__section}>
          <div className={styles.brand__title}>
            <h2 className={styles.brand__title_text}>Бренди</h2>
            <button
              type="button"
              className={styles.brand__button}
              onClick={() => setIsOpenModal(true)}
            >
              ДОДАТИ БРЕНД
            </button>
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
        >
          <BrandManagementForm />
        </ModalWindow>
      </main>
    </AdminLayout>
  );
};

export default Brands;
