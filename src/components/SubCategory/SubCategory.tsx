import s from "./SubCategory.module.scss"
import EditIcon from "src/images/svg/EditIcon"
import ArrowToRightIcon from "src/images/svg/ArrowToRightIcon"
import { FC, useState } from "react"
import ModalWindow from "../ModalWindow"
import { ISubCategoryResponse } from "src/api/categories/types"
import SubCategoryManagementForm from "../SubCategoryManagementForm"
import DeleteIcon from "src/images/svg/DeleteIcon"
import { useAppDispatch } from "src/redux/hooks"
import { deleteSubCategory } from "src/redux/categories/operations"

const SubCategory: FC<ISubCategoryResponse> = ({ categoryId, ...subcategory }) => {
  const dispatch = useAppDispatch()

  const [isEditSubCategoryShown, setIsEditSubCategoryShown] = useState<boolean>(false)

  const isEditSubCategoryClickHandle = () => setIsEditSubCategoryShown(!isEditSubCategoryShown)
  const deleteIconClickHandler = () =>
    dispatch(deleteSubCategory({ categoryId, subCategoryId: subcategory.id }))

  return (
    <li className={s.subcategory}>
      <ArrowToRightIcon iconSize={24} />
      <h5 className={s.subcategory__name}>{subcategory.name}</h5>
      <EditIcon onClick={isEditSubCategoryClickHandle} className={s.subcategory__edit_icon} />
      <DeleteIcon onClick={deleteIconClickHandler} className={s.subcategory__delete_icon} />

      <ModalWindow
        title="Редагувати підкатегорію"
        isOpenModal={isEditSubCategoryShown}
        onClose={isEditSubCategoryClickHandle}
      >
        <SubCategoryManagementForm
          subcategory={subcategory}
          categoryId={categoryId}
          onClose={isEditSubCategoryClickHandle}
        />
      </ModalWindow>
    </li>
  )
}

export default SubCategory
