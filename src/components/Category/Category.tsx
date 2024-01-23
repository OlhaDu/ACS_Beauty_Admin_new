import s from "./Category.module.scss"
import DeleteIcon from "src/images/svg/DeleteIcon_"
import EditIcon from "src/images/svg/EditIcon"
import AddIcon from "src/images/svg/AddIcon_"
import ArrowToRightIcon from "src/images/svg/ArrowToRightIcon"
import Border from "../Border"
import { FC } from "react"
import { ICategory } from "src/types"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"
import { setActiveCategory } from "src/redux/slices/categoriesSlice"
import SubCategories from "../SubCategories"
import { selectActiveCategory } from "src/redux/selectors"
import ArrowDownIcon from "src/images/svg/ArrowDownIcon"
import { deleteCategory } from "src/redux/asyncThunks/categoriesThunks"

const Category: FC<ICategory> = category => {
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector(selectActiveCategory)

  const arrowRightClickHandler = () => {
    dispatch(setActiveCategory(category))
  }

  const arrowDownClickHandler = () => {
    dispatch(setActiveCategory(null))
  }

  const deleteIconClickHandler = () => dispatch(deleteCategory(category.id))

  return (
    <Border border="borderDefault">
      <div className={s.category}>
        <div className={s.categoryTools}>
          <h4 className={s.categoryName}>{category.name}</h4>
          <div className={s.iconsContainer}>
            <EditIcon />
            <DeleteIcon onClick={deleteIconClickHandler} />
            <AddIcon className={s.addIcon} />
          </div>
        </div>
        {activeCategory ? (
          <ArrowDownIcon onClick={arrowDownClickHandler} />
        ) : (
          <ArrowToRightIcon onClick={arrowRightClickHandler} />
        )}
      </div>
      {activeCategory && <SubCategories subcategories={activeCategory.subcategories} />}
    </Border>
  )
}

export default Category
