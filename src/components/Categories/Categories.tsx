import s from "./Categoriis.module.scss"
import Category from "../Category"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"
import { getCategories } from "src/redux/categories/operations"
import { selectCategories } from "src/redux/categories/selectors"

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
        <Category key={category.id} {...category} />
      ))}
    </ul>
  )
}
export default Categories
