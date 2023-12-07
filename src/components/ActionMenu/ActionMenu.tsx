import ChangeIcon from "src/images/svg/ChangeIcon";
import DeleteIcon from "src/images/svg/DeleteIcon";
import AddIcon from "src/images/svg/AddIcon";

import styles from "./ActionMenu.module.scss";

interface IActionMenuProps {
  setActive: (active: boolean) => void;
  setActiveCategoryId: (categoryId: number) => void;
  isAddingSubcategory: boolean;
  showAddSubcategoryPopup: () => void;
}

const ActionMenu = ({
  setActive,
  setActiveCategoryId,
  isAddingSubcategory,
  showAddSubcategoryPopup,
}: IActionMenuProps) => {
  return (
    <div className={styles.actions}>
      <div
        className={styles.icon}
        onClick={() => {
          setActive(true);
          setActiveCategoryId(id);
        }}
      >
        <ChangeIcon />
      </div>
      <div
        className={styles.icon}
        // onClick={() => delCategoryRequest(id)} // удаление категории по id
      >
        <DeleteIcon />
      </div>
      {!isAddingSubcategory && (
        <div className={styles.icon} onClick={showAddSubcategoryPopup}>
          <AddIcon color={"#FFF"} />
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
