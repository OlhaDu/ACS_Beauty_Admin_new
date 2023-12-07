import { useState } from "react";

// import Subcategory from "../Subcategory/Subcategory";
import ChangeIcon from "src/images/svg/ChangeIcon";
import DeleteIcon from "src/images/svg/DeleteIcon";
import AddIcon from "src/images/svg/AddIcon";
import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon";
import ArrowToRight from "src/images/svg/ArrowToRight";
// import AddSubcategoryPopup from "../Popups/AddSubcategoryPopup/AddSubcategoryPopup";

import ICategory from "src/interfaces/categories";

import styles from "./Category.module.scss";

// import subcategories from "src/mocks/subcategories.json";

interface ICategoryProps {
  category: ICategory;
  setActive: (active: boolean) => void;
  setActiveCategoryId: (categoryId: number) => void;
  key?: number;
  // activeCategoryId: () => void;
}

const Category = ({
  category,
  setActive,
  setActiveCategoryId,
}: ICategoryProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addSubcategoryActive, addSubcategorySetActive] = useState(false);

  const { name, id } = category;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    addSubcategorySetActive(false);
  };

  const showAddSubcategoryPopup = () => {
    setIsCollapsed(true);
    addSubcategorySetActive(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.collapseContainer}>
          <div className={styles.categoryName}>
            <h2>{name}</h2>

            {/* меню экшенов */}
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
              {!addSubcategoryActive && (
                <div className={styles.icon} onClick={showAddSubcategoryPopup}>
                  <AddIcon color={"#FFF"} />
                </div>
              )}
            </div>
            {/* меню экшенов */}
          </div>
          <div
            className={styles.openSubcategoriesArrow}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ArrowToBottomIcon /> : <ArrowToRight />}
          </div>
        </div>

        {/* {isCollapsed && !addSubcategoryActive && (
          <div className={styles.content}>
            {subcategories.length
              ? subcategories.map((subcategories) => (
                  <Subcategory
                    subcategories={subcategories}
                    key={subcategories.id}
                  />
                ))
              : null}
          </div>
        )} */}
        {/* {addSubcategoryActive && (
          <div className={styles.content}>
            <AddSubcategoryPopup
              setActive={addSubcategorySetActive}
              categoryId={id}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default Category;
