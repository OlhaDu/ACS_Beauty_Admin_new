import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/Buttons/VioletButton"
import Categories from "src/components/CategoriesComponents/Categories"
import s from "./Categories.module.scss"
import { useState } from "react"
import ModalWindow from "src/components/ModalWindow"
import CategoryManagementForm from "src/components/CategoriesComponents/CategoryManagementForm"

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
          <CategoryManagementForm onClose={closeOpenModal} />
        </ModalWindow>
        <Categories />
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
