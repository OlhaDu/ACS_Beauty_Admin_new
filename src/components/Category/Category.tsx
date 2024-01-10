import s from "./Category.module.scss"
import DeleteIcon from "src/images/svg/DeleteIcon_"
import EditIcon from "src/images/svg/EditIcon"
import AddIcon from "src/images/svg/AddIcon_"
import ArrowToRight from "src/images/svg/ArrowToRight"
import Border from "../Border"
import { FC } from "react"
import { ICategory } from "src/types"

const Category: FC<ICategory> = props => {
  const { category, activeCategory, setActiveCategory, children } = props

  const onArrowRightBtnClick = () => {
    if (!setActiveCategory) return
    setActiveCategory(category)
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
      {children}
    </Border>
  )
}

export default Category
