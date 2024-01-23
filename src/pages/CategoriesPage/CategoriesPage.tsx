import AdminLayout from "src/layouts/AdminLayout"
import VioletButton from "src/components/VioletButton"
import Categories from "src/components/Categories"
import s from "./Categories.module.scss"
import AddCategory from "src/components/AddCategory"

const CategoriesPage = () => {
  const onAddCategotyClick = () => {}

  return (
    <AdminLayout>
      <div className={s.page}>
        <div className={s.heading}>
          <h3>Категорії</h3>
          <VioletButton title="ДОДАТИ КАТЕГОРІЮ" onClick={onAddCategotyClick} />
        </div>
        <AddCategory />
        <Categories />
      </div>
    </AdminLayout>
  )
}

export default CategoriesPage
