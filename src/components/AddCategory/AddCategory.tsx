import CloseIcon from "src/images/svg/CloseIcon_";
import Border from "../Border";
import s from "./AddCategory.module.scss";
import AddIcon from "src/images/svg/AddIcon_";

const AddCategory = () => {
  return (
    <Border border="borderOuter" className={s.borderOuter}>
      <div className={s.head}>
        <h4>ДОДАТИ КАТЕГОРЇЮ</h4>
        <CloseIcon />
      </div>
      <Border border="borderDashed" className={s.borderAddImg}>
        <AddIcon className={s.addIcon} />
        <p>Додати зображення</p>
      </Border>
      <h5>Основна інформація</h5>
    </Border>
  );
};

export default AddCategory;
