import s from "./SubCategory.module.scss";
import EditIcon from "src/images/svg/EditIcon";
import ArrowToRight from "src/images/svg/ArrowToRight";
import { ISubCategory } from "src/types";
import { FC } from "react";

const SubCategory: FC<ISubCategory> = ({ name }) => {
  return (
    <li className={s.subContainer}>
      <ArrowToRight iconSize={24} />
      <h5 className={s.subName}>{name}</h5>
      <EditIcon className={s.subIconWrapper} />
    </li>
  );
};

export default SubCategory;
