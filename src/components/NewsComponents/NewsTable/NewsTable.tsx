import React, { useState } from "react"
import { useSelector } from "react-redux"
import { GridRowId } from "@mui/x-data-grid"
import { useAppDispatch } from "src/redux/store"

import ModalWindow from "src/components/ModalWindow"
import NewsManagementForm from "../NewsManagementForm"
import ActionsColumn from "src/components/ActionsColumn"
import ActionableTable from "src/components/ActionableTable"

import { columns } from "./columns"
import { deleteNews } from "src/redux/news/operations"
import { selectCount, selectNews } from "src/redux/news/selectors"

interface IProps {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const NewsTable: React.FC<IProps> = ({ page, pageSize, setPage, setPageSize }) => {
  const dispatch = useAppDispatch()
  const novelties = useSelector(selectNews)
  const count = useSelector(selectCount)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<GridRowId | 0>(0)

  const getActions = (id: GridRowId) => [
    <ActionsColumn
      onEditClick={() => {
        setIsOpenModal(true)
        setSelectedNews(id)
      }}
      onDeleteClick={() => {
        dispatch(deleteNews(id))
      }}
    />,
  ]

  return (
    <>
      <ActionableTable
        columns={columns}
        rows={novelties}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        count={count}
        getActions={getActions}
      />

      <ModalWindow
        title={"РЕДАГУВАТИ НОВИНУ"}
        onClose={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
      >
        <NewsManagementForm
          novelty={novelties.find(novelties => novelties.id === selectedNews)}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalWindow>
    </>
  )
}

export default NewsTable
