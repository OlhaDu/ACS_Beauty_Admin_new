import s from "./Categoriis.module.scss";
import Category from "../Category";
import { FC } from "react";
import { ICategories } from "src/types";

const Categories: FC<ICategories> = ({ categories, ...props }) => {
  return (
    <ul className={s.categories}>
      {categories.map((category) => (
        <li key={category.id}>
          <Category category={category} {...props} />
        </li>
      ))}
    </ul>
  );
};
export default Categories;
