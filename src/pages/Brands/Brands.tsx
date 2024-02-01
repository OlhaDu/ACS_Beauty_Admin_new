import React, { useEffect, useState } from "react"
import { useAppDispatch } from "src/redux/hooks"
import { getBrands } from "src/redux/brands/operations"

import s from "./Brands.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import ExportFileIcon from "src/images/svg/ExportFileIcon"
import Select from "src/components/ToolsPanel/Select/Select"
import ModalWindow from "src/components/ModalWindow/ModalWindow"
import BrandsTable from "src/components/BrandsComponents/BrandsTable"
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput"
import BrandManagementForm from "src/components/BrandsComponents/BrandManagementForm"

const Brands: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    dispatch(
      getBrands({
        lookup: searchName,
        pageSize,
        page: page + 1,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchName])

  return (
    <AdminLayout>
      <main className={s.brand}>
        <section className={s.brand__section}>
          <div className={s.brand__title}>
            <h2 className={s.brand__title_text}>Бренди</h2>
            <button type="button" className={s.brand__button} onClick={() => setIsOpenModal(true)}>
              ДОДАТИ БРЕНД
            </button>
          </div>

          <div className={s.tools}>
            <SearchInput onChange={setSearchName} />
            <Select
              options={["Експортувати в Exel"]}
              icon={<ExportFileIcon />}
              toolName={"Експортувати"}
            />
          </div>

          <BrandsTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
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
  )
}

export default Brands
