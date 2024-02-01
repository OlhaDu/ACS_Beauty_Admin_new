import s from "./SubCategory.module.scss"
import EditIcon from "src/images/svg/EditIcon"
import ArrowToRightIcon from "src/images/svg/ArrowToRightIcon"
import { FC, useState } from "react"
import ModalWindow from "../ModalWindow"
import { ISubCategoryResponse } from "src/api/categories/types"
import SubCategoryManagementForm from "../SubCategoryManagementForm"

const SubCategory: FC<ISubCategoryResponse> = ({ categoryId, ...subcategory }) => {
  const [isEditSubCategoryShown, setIsEditSubCategoryShown] = useState<boolean>(false)

  const isEditSubCategoryClickHandle = () => setIsEditSubCategoryShown(!isEditSubCategoryShown)

  return (
    <li className={s.subContainer}>
      <ArrowToRightIcon iconSize={24} />
      <h5 className={s.subName}>{subcategory.name}</h5>
      <EditIcon onClick={isEditSubCategoryClickHandle} className={s.subIconWrapper} />
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
