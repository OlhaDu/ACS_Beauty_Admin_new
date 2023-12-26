import EditIcon from "src/images/svg/EditIcon";
import s from "./Category.module.scss";
import DeleteIcon from "src/images/svg/DeleteIcon";
import AddIcon from "src/images/svg/AddIcon";
import ArrowToRight from "src/images/svg/ArrowToRight";

const Category = ({ data }) => {
  const { name } = data;
  return (
    <li className={s.container}>
      <div className={s.tools}>
        <h4 className={s.groupName}>{name}</h4>
        <div className={s.iconsContainer}>
          <EditIcon />
          <DeleteIcon />
          <AddIcon />
        </div>
      </div>
      <ArrowToRight iconSize={48} />
    </li>
  );
};

export default Category;
