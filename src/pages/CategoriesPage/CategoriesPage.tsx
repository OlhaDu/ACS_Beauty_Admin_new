import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/Buttons/VioletButton"
import Categories from "src/components/CategoriesComponents/Categories"
import s from "./Categories.module.scss"
import { useState } from "react"
import ModalWindow from "src/components/ModalWindow"
import CategoryManagementForm from "src/components/CategoriesComponents/CategoryManagementForm"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CategoriesPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onAdd = () => setIsOpenModal(true)
  const onCloseModal = () => setIsOpenModal(false)

  return (
    <AdminLayout>
      <div className={s.categories}>
        <div className={s.categories__head}>
          <h3 className={s.categories__title}>Категорії</h3>
          <VioletButton title="ДОДАТИ КАТЕГОРІЮ" onClick={onAdd} />
        </div>
        <ModalWindow title="ДОДАТИ КАТЕГОРІЮ" isOpenModal={isOpenModal} onClose={onCloseModal}>
          <CategoryManagementForm onClose={onCloseModal} />
        </ModalWindow>
        <Categories />
      </div>
      <ToastContainer position="top-center" />
    </AdminLayout>
  )
}

export default CategoriesPage
