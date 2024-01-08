import { FC } from "react";
import { ISubCategories } from "src/types/ISubCategories";
import SubCategory from "../SubCategory/SubCategory";

const SubCategories: FC<ISubCategories> = ({ subcategories }) => (
  <ul>
    {subcategories &&
      subcategories.map(({ id, name }) => (
        <SubCategory key={id} name={name} id={id} />
      ))}
  </ul>
);

export default SubCategories;
