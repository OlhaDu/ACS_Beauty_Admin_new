import { useState } from "react";

// import Subcategory from "../Subcategory/Subcategory";

import ArrowToBottomIcon from "src/images/svg/ArrowToBottomIcon";
import ArrowToRight from "src/images/svg/ArrowToRight";
// import AddSubcategoryPopup from "../Popups/AddSubcategoryPopup/AddSubcategoryPopup";

import ICategory from "src/interfaces/categories";

import styles from "./Category.module.scss";
import ActionMenu from "../ActionMenu/ActionMenu";

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
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);

  const { name, id } = category;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsAddingSubcategory(false);
  };

  const showAddSubcategoryPopup = () => {
    setIsCollapsed(true);
    setIsAddingSubcategory(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.collapseContainer}>
          <div className={styles.categoryName}>
            <h2>{name}</h2>

            <ActionMenu
              setActive={setActive}
              setActiveCategoryId={setActiveCategoryId}
              isAddingSubcategory={isAddingSubcategory}
              showAddSubcategoryPopup={showAddSubcategoryPopup}
            />
          </div>
          <div
            className={styles.openSubcategoriesArrow}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ArrowToBottomIcon /> : <ArrowToRight />}
          </div>
        </div>

        {/* {isCollapsed && !isAddingSubcategory && (
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
        {/* {isAddingSubcategory && (
          <div className={styles.content}>
            <AddSubcategoryPopup
              setActive={setIsAddingSubcategory}
              categoryId={id}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default Category;
