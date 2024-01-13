import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/store";
import { getBrands } from "src/redux/brands/operations";

import styles from "./Brands.module.scss";
import AdminLayout from "src/layouts/AdminLayout";
import ExportFileIcon from "src/images/svg/ExportFileIcon";
import Select from "src/components/ToolsPanel/Select/Select";
import ModalWindow from "src/components/ModalWindow/ModalWindow";
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput";
import BrandManagementForm from "src/components/BrandsComponents/BrandManagementForm";
import BrandsTableComponent from "src/components/BrandsComponents/BrandsTableComponent/";

interface IPaginationModel {
  page: number;
  pageSize: number;
}

const Brands: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getBrands({
        lookup: searchName,
        ...paginationModel,
        page: paginationModel.page + 1,
      })
    );
  }, [paginationModel, searchName]);

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
            <SearchInput value={searchName} onChange={setSearchName} />
            <Select
              options={["Експортувати в Exel"]}
              icon={<ExportFileIcon />}
              toolName={"Експортувати"}
            />
          </div>

          <BrandsTableComponent
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </section>
        <ModalWindow
          title={"ДОДАТИ БРЕНД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <BrandManagementForm onClose={() => setIsOpenModal(false)} />
        </ModalWindow>
      </main>
    </AdminLayout>
  );
};

export default Brands;
