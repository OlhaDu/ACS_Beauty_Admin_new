import React, { useEffect, useState } from "react"

import { useAppDispatch } from "src/redux/store"
import { getNews } from "src/redux/news/operations"

import s from "./News.module.scss"
import AdminLayout from "src/layouts/AdminLayout"
import ModalWindow from "src/components/ModalWindow"
import PageToolsPanel from "src/components/PageToolsPanel"
import NewsTable from "src/components/NewsComponents/NewsTable"
import NewsManagementForm from "src/components/NewsComponents/NewsManagementForm"

const News: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    dispatch(
      getNews({
        lookup: searchName,
        pageSize,
        page: page + 1,
      })
    )
  }, [page, pageSize, searchName])

  return (
    <AdminLayout>
      <main className={s.news}>
        <section className={s.news__section}>
          <PageToolsPanel
            title="Новини"
            btnTitle="ДОДАТИ НОВИНУ"
            setSearchName={setSearchName}
            setIsOpenModal={setIsOpenModal}
          />

          <NewsTable page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
        </section>

        <ModalWindow
          title={"ДОДАТИ НОВИНУ"}
          onClose={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        >
          <NewsManagementForm onClose={() => setIsOpenModal(false)} />
        </ModalWindow>
      </main>
    </AdminLayout>
  )
}

export default News
