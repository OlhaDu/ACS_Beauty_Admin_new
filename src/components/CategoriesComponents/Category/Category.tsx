import { FC, useState } from "react"
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
import ModalWindow from "../../ModalWindow"
import CategoryManagementForm from "../CategoryManagementForm"
import SubCategoryManagementForm from "../../SubCategoryManagementForm"

const Category: FC<ICategory> = category => {
  const { id, name, subcategories } = category

  const [isSubCategoriesShown, setIsSubCategoriesShown] = useState<boolean>(false)
  const [isEditCategoryShown, setIsEditCategoryShown] = useState<boolean>(false)
  const [isAddSubCategoryShown, setIsAddSubCategoryShown] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const deleteIconClickHandler = () => dispatch(deleteCategory(id))
  const isSubcategoriesShownClickHandler = () => setIsSubCategoriesShown(!isSubCategoriesShown)
  const isEditCategoryShownClickHandler = () => setIsEditCategoryShown(!isEditCategoryShown)
  const isAddSubCategoryShownClickHandler = () => setIsAddSubCategoryShown(!isAddSubCategoryShown)

  const shouldArrowIconsShown = category.subcategories.length !== 0

  return (
    <li className={s.category}>
      <div className={s.category__container_center}>
        <div className={s.category__tools}>
          <h4 className={s.category__title}>{name}</h4>
          <div className={s.category__icons_container}>
            <EditIcon className={s.category__icon} onClick={isEditCategoryShownClickHandler} />
            <DeleteIcon className={s.category__icon} onClick={deleteIconClickHandler} />
            <AddIcon className={s.category__add_icon} onClick={isAddSubCategoryShownClickHandler} />
          </div>
        </div>
        {shouldArrowIconsShown &&
          (isSubCategoriesShown ? (
            <ArrowDownIcon
              className={s.category__arrow}
              onClick={isSubcategoriesShownClickHandler}
            />
          ) : (
            <ArrowToRightIcon
              className={s.category__arrow}
              onClick={isSubcategoriesShownClickHandler}
            />
          ))}
      </div>
      {isSubCategoriesShown && <SubCategories subcategories={subcategories} categoryId={id} />}
      <ModalWindow
        title="РЕДАГУВАТИ КАТЕГОРІЮ"
        onClose={isEditCategoryShownClickHandler}
        isOpenModal={isEditCategoryShown}
      >
        <CategoryManagementForm category={category} onClose={isEditCategoryShownClickHandler} />
      </ModalWindow>
      <ModalWindow
        title="Додати підкатегорію"
        onClose={isAddSubCategoryShownClickHandler}
        isOpenModal={isAddSubCategoryShown}
      >
        <SubCategoryManagementForm categoryId={id} onClose={isAddSubCategoryShownClickHandler} />
      </ModalWindow>
    </li>
  )
}

export default Category
