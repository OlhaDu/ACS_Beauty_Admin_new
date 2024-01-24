import { FC } from "react"
import { ISubCategories } from "src/types/ISubCategories"
import SubCategory from "../SubCategory/SubCategory"
import s from "./SubCategory.module.scss"

const SubCategories: FC<ISubCategories> = ({ subcategories }) => (
  <ul className={s.subCategories}>
    {subcategories &&
      subcategories.map(({ id, name }) => <SubCategory key={id} name={name} id={id} />)}
  </ul>
)

export default SubCategories
