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

const Category: FC<ICategory> = category => {
  const [isSubCategoryShown, setIsSubCategoryShown] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const arrowRightClickHandler = () => setIsSubCategoryShown(true)
  const arrowDownClickHandler = () => setIsSubCategoryShown(false)
  const deleteIconClickHandler = () => dispatch(deleteCategory(category.id))

  const category__addIcon = cn(s.category__addIcon, s.category__icon)

  return (
    <li className={s.category}>
      <div className={s.category__container_center}>
        <div className={s.category__tools}>
          <h4 className={s.category__title}>{category.name}</h4>
          <div className={s.category__icons_container}>
            <EditIcon className={s.category__icon} />
            <DeleteIcon onClick={deleteIconClickHandler} className={s.category__icon} />
            <AddIcon className={category__addIcon} />
          </div>
        </div>
        {isSubCategoryShown ? (
          <ArrowDownIcon onClick={arrowDownClickHandler} />
        ) : (
          <ArrowToRightIcon onClick={arrowRightClickHandler} />
        )}
      </div>
      {isSubCategoryShown && <SubCategories subcategories={category.subcategories} />}
    </li>
  )
}

export default Category
