import s from "./Categoriis.module.scss"
import Category from "../Category"
import { FC, useEffect } from "react"
import { ICategories } from "src/types"
import { useAppDispatch, useAppSelector } from "src/redux/selectors"
import { getCategories } from "src/redux/asyncThunks/getCategoriesThunk"
import { selectCategories } from "src/redux/hooks"

const Categories: FC<ICategories> = props => {
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
          <Category category={category} {...props} />
        </li>
      ))}
    </ul>
  )
}
export default Categories
