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
import { getErrorMessage } from "../helpers"
import { toast } from "react-toastify"

const Category: FC<ICategory> = category => {
  const { id, name, subcategories } = category

  const [isSubCategoriesShown, setIsSubCategoriesShown] = useState(false)
  const [isEditCategoryShown, setIsEditCategoryShown] = useState(false)
  const [isAddSubCategoryShown, setIsAddSubCategoryShown] = useState(false)

  const dispatch = useAppDispatch()

  const onDeleteClick = async () => {
    try {
      await dispatch(deleteCategory(id)).unwrap()
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }
  const onToggleSubCategoryShown = () => setIsSubCategoriesShown(!isSubCategoriesShown)
  const onToggleEditCategoryShown = () => setIsEditCategoryShown(!isEditCategoryShown)
  const onToggleSubCategoryAdd = () => setIsAddSubCategoryShown(!isAddSubCategoryShown)

  const showArrow = category.subcategories.length !== 0

  return (
    <li className={s.category}>
      <div className={s.category__container_center}>
        <div className={s.category__tools}>
          <h4 className={s.category__title}>{name}</h4>
          <div className={s.category__icons_container}>
            <EditIcon className={s.category__icon} onClick={onToggleEditCategoryShown} />
            <DeleteIcon className={s.category__icon} onClick={onDeleteClick} />
            <AddIcon className={s.category__add_icon} onClick={onToggleSubCategoryAdd} />
          </div>
        </div>
        {showArrow &&
          (isSubCategoriesShown ? (
            <ArrowIcon className={s.category__arrow} onClick={onToggleSubCategoryShown} />
          ) : (
            <ArrowIcon className={s.category__right_arrow} onClick={onToggleSubCategoryShown} />
          ))}
      </div>
      {isSubCategoriesShown && <SubCategories subcategories={subcategories} categoryId={id} />}
      <ModalWindow
        title="РЕДАГУВАТИ КАТЕГОРІЮ"
        onClose={onToggleEditCategoryShown}
        isOpenModal={isEditCategoryShown}
      >
        <CategoryManagementForm category={category} onClose={onToggleEditCategoryShown} />
      </ModalWindow>
      <ModalWindow
        title="Додати підкатегорію"
        onClose={onToggleSubCategoryAdd}
        isOpenModal={isAddSubCategoryShown}
      >
        <SubCategoryManagementForm categoryId={id} onClose={onToggleSubCategoryAdd} />
      </ModalWindow>
    </li>
  )
}

export default Category
