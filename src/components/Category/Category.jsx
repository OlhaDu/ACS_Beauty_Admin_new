import React, { useState } from "react";
import styles from "./Category.module.scss";
import ArrowToRight from "../../../svgs/ArrowToRight";
import ChangeIcon from "../../../svgs/ChangeIcon";
import DeleteIcon from "../../../svgs/DeleteIcon";
import AddIcon from "../../../svgs/AddIcon";
import Subcategory from "../Subcategory/Subcategory";
import AddSubcategoryPopup from "../../../components/Popups/AddSubcategoryPopup/AddSubcategoryPopup";
import ArrowToBottomIcon from "../../../svgs/ArrowToBottomIcon";
import { connect } from "react-redux";
import actionCreators from "../../../store/actions/actionCreators";

const Category = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addSubcategoryActive, addSubcategorySetActive] = useState(false);
  const { name, categoryId, subcategories } = props.data;
  const { delCategoryRequest } = props;
  const { setActive, setActiveCategoryId, activeCategoryId } = props;

  // console.log(activeCategoryId)
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
        <div className={styles.collapsContainer}>
          <div></div>
          <div className={styles.categoryName}>
            <h2>{name}</h2>
            <div className={styles.actions}>
              <div
                className={styles.icon}
                onClick={() => {
                  setActive(true);
                  setActiveCategoryId(categoryId);
                }}
              >
                <ChangeIcon />
              </div>
              <div
                className={styles.icon}
                onClick={() => delCategoryRequest(categoryId)}
              >
                <DeleteIcon />
              </div>
              {!addSubcategoryActive && (
                <div className={styles.icon} onClick={showAddSubcategoryPopup}>
                  <AddIcon color={"#FFF"} />
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.openSubcategoriesArrow}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ArrowToBottomIcon /> : <ArrowToRight />}
          </div>
        </div>
        {isCollapsed && !addSubcategoryActive && (
          <div className={styles.content}>
            {subcategories.length
              ? subcategories.map((subcategories) => (
                  <Subcategory
                    subcategories={subcategories}
                    key={subcategories.subcategoryId}
                  />
                ))
              : null}
          </div>
        )}
        {addSubcategoryActive && (
          <div className={styles.content}>
            <AddSubcategoryPopup
              setActive={addSubcategorySetActive}
              categoryId={categoryId}
            />
          </div>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  delCategoryRequest: (id) => dispatch(actionCreators.delCategoryRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
