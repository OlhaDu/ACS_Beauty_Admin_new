import React, { useEffect, useState } from "react"
import { useAppDispatch } from "src/redux/hooks"
import { getSlides } from "src/redux/slides/operations"
import s from "./Slides.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import ExportFileIcon from "src/images/svg/ExportFileIcon"
import Select from "src/components/ToolsPanel/Select/Select"
import ModalWindow from "src/components/ModalWindow/ModalWindow"
import SlideManagementForm from "src/components/SlidesComponents/SlideManagementForm"
import SlidesTable from "src/components/SlidesComponents/SlidesTable"

const Slides: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    dispatch(
      getSlides({
        pageSize,
        page: page + 1,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  return (
    <AdminLayout>
      <main className={s.slide}>
        <section className={s.slide__section}>
          <div className={s.slide__title}>
            <h2 className={s.slide__title_text}>Бренди</h2>
            <button type="button" className={s.slide__button} onClick={() => setIsOpenModal(true)}>
              ДОДАТИ СЛАЙД
            </button>
          </div>

          <div className={s.tools}>
            {/* <SearchInput onChange={setSearchName} /> */}
            <Select
              options={["Експортувати в Exel"]}
              icon={<ExportFileIcon />}
              toolName={"Експортувати"}
            />
          </div>

          <SlidesTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </section>
        <ModalWindow
          title={"ДОДАТИ СЛАЙД"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <SlideManagementForm onClose={() => setIsOpenModal(false)} />
        </ModalWindow>
      </main>
    </AdminLayout>
  )
}

export default Slides
