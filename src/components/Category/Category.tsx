import { FC, useState } from "react"
import cn from "classnames"
import { useAppDispatch } from "src/redux/hooks"
import { deleteCategory } from "src/redux/categories/operations"
import DeleteIcon from "src/images/svg/DeleteIcon"
import EditIcon from "src/images/svg/EditIcon"
import AddIcon from "src/images/svg/AddIcon_"
import ArrowToRightIcon from "src/images/svg/ArrowToRightIcon"
import ArrowDownIcon from "src/images/svg/ArrowDownIcon"
import SubCategories from "../SubCategories"
import { ICategory } from "src/types"
import s from "./Category.module.scss"
import ModalWindow from "../ModalWindow"
import AddOrUpdateCategory from "../AddOrUpdateCategory"

const Category: FC<ICategory> = category => {
  const { id, name, description, subcategories, logo, slug } = category

  const [isSubCategoryShown, setIsSubCategoryShown] = useState<boolean>(false)
  const [isEditCategoryShown, setIsEditCategoryShown] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const deleteIconClickHandler = () => dispatch(deleteCategory(id))
  const isSubcategoryShownClickHandler = () => setIsSubCategoryShown(!isSubCategoryShown)
  const isEditCategoryShownClickHandler = () => setIsEditCategoryShown(!isEditCategoryShown)

  const initialValues = {
    name,
    description: description ? description : "",
    file: null,
    slug,
  }

  const category__addIcon = cn(s.category__addIcon, s.category__icon)

  return (
    <li className={s.category}>
      <div className={s.category__container_center}>
        <div className={s.category__tools}>
          <h4 className={s.category__title}>{name}</h4>
          <div className={s.category__icons_container}>
            <EditIcon className={s.category__icon} onClick={isEditCategoryShownClickHandler} />
            <DeleteIcon onClick={deleteIconClickHandler} className={s.category__icon} />
            <AddIcon className={category__addIcon} />
          </div>
        </div>
        {isSubCategoryShown ? (
          <ArrowDownIcon onClick={isSubcategoryShownClickHandler} />
        ) : (
          <ArrowToRightIcon onClick={isSubcategoryShownClickHandler} />
        )}
      </div>
      {isSubCategoryShown && <SubCategories subcategories={subcategories} />}
      {isEditCategoryShown && (
        <ModalWindow
          title="РЕДАГУВАТИ КАТЕГОРІЮ"
          onClose={isEditCategoryShownClickHandler}
          isOpenModal={isEditCategoryShown}
        >
          <AddOrUpdateCategory initialValues={initialValues} logo={logo} action="update" />
        </ModalWindow>
      )}
    </li>
  )
}

export default Category
