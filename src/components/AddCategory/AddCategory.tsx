import CloseIcon from "src/images/svg/CloseIcon_";
import Border from "../Border";
import s from "./AddCategory.module.scss";
import { addCategoryFormSchema } from "src/libs/yup";
import FormGenerator from "../FormGenerator";
import AddImageInput from "../AddImageInput";
import { api } from "src/api";
import { IInitialValues } from "src/types";

const addCategoryForm = {
  initialValues: {
    image: null,
    name: "",
    description: "",
    enabled: false,
  },
  validationSchema: addCategoryFormSchema,
  groups: [
    {
      fields: [
        {
          component: <AddImageInput />,
        },
      ],
    },
    {
      group: "Основна інформація",
      fields: [
        { name: "name", label: "Назва категорії" },
        {
          name: "description",
          label: "Опис",
          as: "textarea",
          className: s.textArea,
        },
      ],
    },
  ],
  onSubmit: async (value: IInitialValues) => api.addCategory(value),
  isToggler: true,
};

const AddCategory = () => {
  return (
    <Border border="borderOuter" className={s.borderOuter}>
      <div className={s.head}>
        <h4>ДОДАТИ КАТЕГОРЇЮ</h4>
        <CloseIcon />
      </div>
      <FormGenerator<IInitialValues> {...addCategoryForm} />
    </Border>
  );
};

export default AddCategory;
