import { useEffect, useState } from "react"
import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/VioletButton"
import Categories from "src/components/Categories"
import Category from "src/components/Category"
import SubCategories from "src/components/SubCategories"
import s from "./Categories.module.scss"
import { api } from "src/api"
import AddCategory from "src/components/AddCategory"
import { ICategoryProp } from "src/types"

const CategoriesPage = () => {
  const [categories, setCategories] = useState<ICategoryProp[]>([])
  const [activeCategory, setActiveCategory] = useState<ICategoryProp | null>(null)
  const [isAddCategoryActive, setIsAddCategoryActive] = useState<boolean>(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.getCategories()
      setCategories(res.data)
    }
    getCategories()
  }, [])

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
        {isAddCategoryActive && <AddCategory />}
        {!activeCategory && !isAddCategoryActive && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        {activeCategory && !isAddCategoryActive && (
          <div className={s.categoryWrap}>
            <Category category={activeCategory}>
              <SubCategories subcategories={activeCategory.subcategories} />
            </Category>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
