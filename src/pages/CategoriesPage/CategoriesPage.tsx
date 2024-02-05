import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/Buttons/VioletButton"
import Categories from "src/components/CategoriesComponents/Categories"
import s from "./Categories.module.scss"
import { useState } from "react"
import ModalWindow from "src/components/ModalWindow"
import CategoryManagementForm from "src/components/CategoriesComponents/CategoryManagementForm"

const CategoriesPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onAddClick = () => setIsOpenModal(true)
  const onCloseModalClick = () => setIsOpenModal(false)

  return (
    <AdminLayout>
      <div className={s.categories}>
        <div className={s.categories__head}>
          <h3 className={s.categories__title}>Категорії</h3>
          <VioletButton title="ДОДАТИ КАТЕГОРІЮ" onClick={onAddClick} />
        </div>
        <ModalWindow title="ДОДАТИ КАТЕГОРІЮ" isOpenModal={isOpenModal} onClose={onCloseModalClick}>
          <CategoryManagementForm onClose={onCloseModalClick} />
        </ModalWindow>
        <Categories />
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
