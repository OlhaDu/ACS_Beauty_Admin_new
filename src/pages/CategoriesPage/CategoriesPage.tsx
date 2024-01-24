import { useState } from "react"
import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/Buttons/VioletButton"
import Categories from "src/components/Categories"
import Category from "src/components/Category"
import s from "./Categories.module.scss"
import AddCategory from "src/components/AddCategory"
import { useAppSelector } from "src/redux/selectors"
import { selectActiveCategory } from "src/redux/hooks"

const CategoriesPage = () => {
  const activeCategory = useAppSelector(selectActiveCategory)
  const [isAddCategoryActive, setIsAddCategoryActive] = useState<boolean>(false)

  const onAddCategotyClick = () => {
    setIsAddCategoryActive(true)
  }

  return (
    <AdminLayout>
      <div className={s.page}>
        <div className={s.heading}>
          <h3>Категорії{isAddCategoryActive && "/Додати категорію"}</h3>
          {!isAddCategoryActive && (
            <VioletButton title="ДОДАТИ КАТЕГОРІЮ" onClick={onAddCategotyClick} />
          )}
        </div>
        {isAddCategoryActive && <AddCategory setIsAddCategoryActive={setIsAddCategoryActive} />}
        {!activeCategory && !isAddCategoryActive && <Categories />}
        {activeCategory && !isAddCategoryActive && (
          <div className={s.categoryWrap}>
            <Category category={activeCategory} />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
