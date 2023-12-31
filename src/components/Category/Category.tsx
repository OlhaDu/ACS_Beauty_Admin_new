import EditIcon from "src/images/svg/EditIcon";
import s from "./Category.module.scss";
import DeleteIcon from "src/images/svg/DeleteIcon";
import AddIcon from "src/images/svg/AddIcon";
import ArrowToRight from "src/images/svg/ArrowToRight";
import { FC } from "react";
import { ICategory } from "src/types";
// import SubCategory from "../SubCategory/SubCategory";

const Category: FC<ICategory> = (props) => {
  const { name } = props;
  return (
    <li className={s.item}>
      <div className={s.container}>
        <div className={s.categoryTools}>
          <h4 className={s.categoryName}>{name}</h4>
          <div className={s.iconsContainer}>
            <EditIcon />
            <DeleteIcon />
            <AddIcon />
          </div>
        </div>
        <ArrowToRight />
      </div>
      {/* <SubCategory /> */}
    </li>
  );
};

export default Category;
