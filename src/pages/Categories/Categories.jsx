import { useEffect, useState } from "react";
import s from "./Categories.module.scss";
import VioletButton from "src/components/VioletButton/VioletButton";
import Category from "src/components/Category/Category";
import { api } from "src/api";
import AdminLayout from "src/layouts/AdminLayout";

// import Category from "./Category/Category";
// import AddCategoryPopup from "../../components/Popups/AddCategoryPopup/AddCategoryPopup";
// import { connect } from "react-redux";
// import actionCreators from "../../store/actions/actionCreators";
// import { UNKNOWN } from "../../constants";

const Categories = () => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [categories, setCategories] = useState(null);
  const [activeCategoryName, setActiveCategoryName] = useState(null);
  const [activeSubcategories, setActiveSubcaterories] = useState(null);
  // const [activeCategoryId, setActiveCategoryId] = useState(null);
  // const {
  //   getCategoriesRequest,
  //   categories: { isFetching, categories, error },
  // } = props;
  // const { categories } = props;

  // useEffect(() => {
  //   if (!categories.length) {
  //     getCategoriesRequest();
  //   }
  // }, []);
  useEffect(() => {
    const getCategories = async () => {
      const res = await api.getCategories();
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <AdminLayout>
      <div
        className={s.page}
        style={{ display: isCategoryActive ? "none" : "" }}
      >
        <div className={s.heading}>
          <h3>Категорії</h3>
          <VioletButton
            title="ДОДАТИ КАТЕГОРІЮ"
            // onClickFunction={() => setActive(true)}
          />
        </div>
        <ul className={s.collapses}>
          {categories &&
            categories.map(({ id, name, subcategories }) => (
              <Category
                name={name}
                key={id}
                subcategories={subcategories}
                isCategoryActive={isCategoryActive}
                setIsCategoryActive={setIsCategoryActive}
                setActiveCategoryName={setActiveCategoryName}
                setActiveSubcaterories={setActiveSubcaterories}
              />
            ))}
        </ul>
      </div>
      {isCategoryActive && (
        <div className={s.page}>
          <Category
            name={activeCategoryName}
            subcategories={activeSubcategories}
            isCategoryActive={isCategoryActive}
          />
        </div>
      )}
    </AdminLayout>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   getCategoriesRequest: () => dispatch(actionCreators.getCategoriesRequest()),
// });

// const mapStateToProps = (state) => {
//   return {
//     categories: state.categoriesReducer,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Categories);
export default Categories;
