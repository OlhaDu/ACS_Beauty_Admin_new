import s from "./Categoriis.module.scss"
import Category from "../Category"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"
import { getCategories } from "src/redux/asyncThunks/categoriesThunks"
import { selectCategories } from "src/redux/selectors"

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)

  useEffect(() => {
    dispatch(getCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ul className={s.categories}>
      {categories.map(category => (
        <li key={category.id}>
          <Category {...category} />
        </li>
      ))}
    </ul>
  )
}
export default Categories
