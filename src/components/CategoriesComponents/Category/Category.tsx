import { FC, useState } from "react"
import { useAppDispatch } from "src/redux/hooks"
import { deleteCategory } from "src/redux/categories/operations"
import DeleteIcon from "src/images/svg/DeleteIcon"
import EditIcon from "src/images/svg/EditIcon"
import AddIcon from "src/images/svg/AddIcon_"
import ArrowIcon from "src/images/svg/ArrowIcon"
import SubCategories from "../SubCategories"
import { ICategory } from "src/types/categories"
import s from "./Category.module.scss"
import ModalWindow from "../../ModalWindow"
import CategoryManagementForm from "../CategoryManagementForm"
import SubCategoryManagementForm from "../../SubCategoryManagementForm"

const Category: FC<ICategory> = category => {
  const { id, name, subcategories } = category

  const [isSubCategoriesShown, setIsSubCategoriesShown] = useState(false)
  const [isEditCategoryShown, setIsEditCategoryShown] = useState(false)
  const [isAddSubCategoryShown, setIsAddSubCategoryShown] = useState(false)

  const dispatch = useAppDispatch()

  const onDeleteCategoryClick = () => dispatch(deleteCategory(id))
  const onShownSubCategoryClick = () => setIsSubCategoriesShown(!isSubCategoriesShown)
  const onEditCategoryClick = () => setIsEditCategoryShown(!isEditCategoryShown)
  const onAddSubCategoryClick = () => setIsAddSubCategoryShown(!isAddSubCategoryShown)

  const showArrow = category.subcategories.length !== 0

  return (
    <li className={s.category}>
      <div className={s.category__container_center}>
        <div className={s.category__tools}>
          <h4 className={s.category__title}>{name}</h4>
          <div className={s.category__icons_container}>
            <EditIcon className={s.category__icon} onClick={onEditCategoryClick} />
            <DeleteIcon className={s.category__icon} onClick={onDeleteCategoryClick} />
            <AddIcon className={s.category__add_icon} onClick={onAddSubCategoryClick} />
          </div>
        </div>
        {showArrow &&
          (isSubCategoriesShown ? (
            <ArrowIcon className={s.category__arrow} onClick={onShownSubCategoryClick} />
          ) : (
            <ArrowIcon className={s.category__right_arrow} onClick={onShownSubCategoryClick} />
          ))}
      </div>
      {isSubCategoriesShown && <SubCategories subcategories={subcategories} categoryId={id} />}
      <ModalWindow
        title="РЕДАГУВАТИ КАТЕГОРІЮ"
        onClose={onEditCategoryClick}
        isOpenModal={isEditCategoryShown}
      >
        <CategoryManagementForm category={category} onClose={onEditCategoryClick} />
      </ModalWindow>
      <ModalWindow
        title="Додати підкатегорію"
        onClose={onAddSubCategoryClick}
        isOpenModal={isAddSubCategoryShown}
      >
        <SubCategoryManagementForm categoryId={id} onClose={onAddSubCategoryClick} />
      </ModalWindow>
    </li>
  )
}

export default Category
