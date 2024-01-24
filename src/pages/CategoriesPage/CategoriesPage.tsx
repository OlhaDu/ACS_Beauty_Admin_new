import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/VioletButton"
import Categories from "src/components/Categories"
import s from "./Categories.module.scss"
import AddCategory from "src/components/AddCategory"
import { useState } from "react"
import ModalWindow from "src/components/ModalWindow"

const CategoriesPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const addCategotyClickHandler = () => setIsOpenModal(true)
  const closeOpenModal = () => setIsOpenModal(false)

  return (
    <AdminLayout>
      <div className={s.categories}>
        <div className={s.categories__head}>
          <h3 className={s.categories__title}>Категорії</h3>
          <VioletButton title="ДОДАТИ КАТЕГОРІЮ" onClick={addCategotyClickHandler} />
        </div>
        <ModalWindow title="ДОДАТИ КАТЕГОРІЮ" isOpenModal={isOpenModal} onClose={closeOpenModal}>
          <AddCategory />
        </ModalWindow>
        <Categories />
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
