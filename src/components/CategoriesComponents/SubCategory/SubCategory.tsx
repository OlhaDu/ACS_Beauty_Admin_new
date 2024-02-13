import s from "./SubCategory.module.scss"
import EditIcon from "src/images/svg/EditIcon"
import { FC, useState } from "react"
import ModalWindow from "../../ModalWindow"
import SubCategoryManagementForm from "../../SubCategoryManagementForm"
import DeleteIcon from "src/images/svg/DeleteIcon"
import { useAppDispatch } from "src/redux/hooks"
import { deleteSubCategory } from "src/redux/categories/operations"
import { ISubCategoryRes } from "src/types/categories"
import ArrowIcon from "src/images/svg/ArrowIcon"
import { getErrorMessage } from "../helpers"
import { toast } from "react-toastify"

const SubCategory: FC<ISubCategoryRes> = ({ categoryId, ...subcategory }) => {
  const dispatch = useAppDispatch()

  const [isEditSubCategoryShown, setIsEditSubCategoryShown] = useState(false)

  const onEditClick = () => setIsEditSubCategoryShown(!isEditSubCategoryShown)

  const onDeleteClick = async () => {
    try {
      await dispatch(deleteSubCategory({ categoryId, subCategoryId: subcategory.id })).unwrap()
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  return (
    <li className={s.subcategory}>
      <ArrowIcon className={s.category__right_arrow} />
      <h5 className={s.subcategory__name}>{subcategory.name}</h5>
      <EditIcon onClick={onEditClick} className={s.subcategory__edit_icon} />
      <DeleteIcon onClick={onDeleteClick} className={s.subcategory__delete_icon} />

      <ModalWindow
        title="Редагувати підкатегорію"
        isOpenModal={isEditSubCategoryShown}
        onClose={onEditClick}
      >
        <SubCategoryManagementForm
          subcategory={subcategory}
          categoryId={categoryId}
          onClose={onEditClick}
        />
      </ModalWindow>
    </li>
  )
}

export default SubCategory
