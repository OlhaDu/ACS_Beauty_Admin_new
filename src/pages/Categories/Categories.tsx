import { useState } from "react";

// import { connect } from "react-redux";
// import actionCreators from "../../store/actions/actionCreators";
// import { UNKNOWN } from "../../constants";

import Category from "src/components/Category/Category";
import VioletButton from "src/components/VioletButton/VioletButton";

import styles from "./Categories.module.scss";

import categories from "src/mocks/categories.json";

type CategoryId = number | null;

const Categories = () => {
  const [active, setActive] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>(null);
  console.log(`🚀 ~ Categories ~ activeCategoryId:`, activeCategoryId);

  // здесь получение всех категорий
  // useEffect(() => {}, []);

  // if (!categories) {
  //   return null;
  // }

  return (
    <>
      <div
        className={styles.container}
        style={{ display: active ? "none" : "" }}
      >
        <div className={styles.heading}>
          <h3>Категорії</h3>
          <VioletButton
            buttonText={"ДОДАТИ КАТЕГОРІЮ"}
            onClickFunction={() => setActive(true)}
          />
        </div>
        <div className={styles.collapses}>
          {categories.map((category) => (
            <Category
              category={category}
              key={category.id}
              setActive={setActive}
              setActiveCategoryId={setActiveCategoryId}
            />
          ))}
        </div>
      </div>
      {/* {active && (
        <AddCategoryPopup
          setActive={setActive}
          setActiveCategoryId={setActiveCategoryId}
          activeCategoryId={activeCategoryId}
        />
      )} */}
    </>
  );
};

export default Categories;
