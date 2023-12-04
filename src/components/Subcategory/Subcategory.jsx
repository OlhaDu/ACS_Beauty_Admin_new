import React, { useState } from "react";
import styles from "./Subcategory.module.scss";
import ChangeIcon from "../../../../svgs/ChangeIcon";
import ArrowToRight from "../../../../svgs/ArrowToRight";
import ArrowToBottomIcon from "../../../../svgs/ArrowToBottomIcon";
import DeleteIcon from '../../../../svgs/DeleteIcon';
import { connect } from "react-redux";
import actionCreators from '../../../../store/actions/actionCreators';

const Subcategory = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {name, subcategoryId} = props.subcategories
  const { delSubcategoryRequest} = props;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={styles.container}>
      <div className={styles.collaps}>
        <section onClick={toggleCollapse}>
          <div className={styles.openMoreArrow}>
            {isCollapsed ? (
              <ArrowToBottomIcon iconSize={"24"} />
            ) : (
              <ArrowToRight iconSize={"24"} />
            )}
          </div>
          <h5>{name}</h5>
        </section>
        <section>
        <div className={styles.icon}>
          <ChangeIcon />
        </div>
        <div className={styles.icon} onClick={() => delSubcategoryRequest(subcategoryId)}>
        <DeleteIcon/>
        </div>
        </section>
        
      </div>
      {isCollapsed && (
        <div className={styles.content}>
          Дополнительная инфо по подкатегории
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  delSubcategoryRequest: (id) => dispatch(actionCreators.delSubcategoryRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subcategory);
