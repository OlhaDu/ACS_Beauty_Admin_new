import s from "./Categoriis.module.scss"
import Category from "../Category"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"
import { getCategories } from "src/redux/categories/operations"
import { selectCategories } from "src/redux/categories/selectors"
import { getErrorMessage } from "../helpers"
import { toast } from "react-toastify"

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        await dispatch(getCategories()).unwrap()
      } catch (error) {
        const message = getErrorMessage(error)
        toast.error(message)
      }
    }
    getAllCategories()
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
