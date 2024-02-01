import { FC } from "react"
import { ISubCategories } from "src/types/ISubCategories"
import SubCategory from "../SubCategory/SubCategory"
import s from "./SubCategory.module.scss"

const SubCategories: FC<ISubCategories> = ({ subcategories, categoryId }) => (
  <ul className={s.subCategories}>
    {subcategories &&
      subcategories.map(subcategory => (
        <SubCategory key={subcategory.id} {...subcategory} categoryId={categoryId} />
      ))}
  </ul>
)

export default SubCategories
