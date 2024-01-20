import s from "./Category.module.scss"
import DeleteIcon from "src/images/svg/DeleteIcon_"
import EditIcon from "src/images/svg/EditIcon"
import AddIcon from "src/images/svg/AddIcon_"
import ArrowToRight from "src/images/svg/ArrowToRight"
import Border from "../Border"
import { FC } from "react"
import { ICategory } from "src/types"
import { useAppDispatch, useAppSelector } from "src/redux/selectors"
import { setActiveCategory } from "src/redux/slices/categoriesSlice"
import SubCategories from "../SubCategories"
import { selectActiveCategory } from "src/redux/hooks"

const Category: FC<ICategory> = ({ category }) => {
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector(selectActiveCategory)

  const onArrowRightBtnClick = () => {
    dispatch(setActiveCategory(category))
  }

  return (
    <Border border="borderDefault">
      <div className={s.category}>
        <div className={s.categoryTools}>
          <h4 className={s.categoryName}>{category.name}</h4>
          <div className={s.iconsContainer}>
            <EditIcon />
            <DeleteIcon />
            <AddIcon className={s.addIcon} />
          </div>
        </div>
        {!activeCategory && (
          <button onClick={onArrowRightBtnClick}>
            <ArrowToRight />
          </button>
        )}
      </div>
      {activeCategory && <SubCategories subcategories={activeCategory.subcategories} />}
    </Border>
  )
}

export default Category
