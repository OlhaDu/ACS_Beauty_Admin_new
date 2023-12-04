import { useEffect, useState } from "react";

// import { connect } from "react-redux";
// import actionCreators from "../../store/actions/actionCreators";
// import { UNKNOWN } from "../../constants";

import VioletButton from "src/components/VioletButton/VioletButton";

import styles from "./Categories.module.scss";

export const Categories = () => {
  const [active, setActive] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const categories: any = [];

  // здесь сделать запрос на получение категорий с бека или он будет в общем стейте
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
              data={category}
              key={category.categoryId}
              setActive={setActive}
              setActiveCategoryId={setActiveCategoryId}
            />
          ))}
        </div>
      </div>
      {active && (
        <AddCategoryPopup
          setActive={setActive}
          setActiveCategoryId={setActiveCategoryId}
          activeCategoryId={activeCategoryId}
        />
      )}
    </>
  );
};
