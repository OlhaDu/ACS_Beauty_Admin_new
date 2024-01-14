import React from "react";
import styles from "./AddSubcategoryPopup.module.scss";
import CloseIcon from "../../../svgs/CloseIcon";
import VioletButton from "../../Buttons/VioletButton/VioletButton";
import Toggler from "../../Toggler/Toggler";
import {Formik, Form, Field} from "formik";
import {connect} from "react-redux";
import actionCreators from "../../../store/actions/actionCreators";
import * as Yup from "yup";
import {ukraineWordsString, validateLinkString} from "../../../utils/regex";

const AddSubcategoryPopup = ({setActive, ...props}) => {
  const {addSubcategoryRequest, categoryId} = props;
  
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div></div>
        <h3>ДОДАТИ ПІДКАТЕГОРІЮ</h3>
        <div className={styles.closeIcon} onClick={() => setActive(false)}>
          <CloseIcon/>
        </div>
      </div>
      <Formik
        initialValues={{name: "", linkKey: "", disabled: false, categoryId: categoryId}}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Обов`язковий")
            .min(3, "Назва має складатися не менше ніж з 3 символів")
            .max(64, "Назва не може перевищувати 64 символи")
            .matches(
              ukraineWordsString,
              "Можна використовувати лише українські літери"
            ),
          linkKey: Yup.string()
            .required("Обов`язковий")
            .min(3, "Посилання має складатися не менше ніж з 3 символів")
            .max(64, "Посилання не може перевищувати 64 символи")
            .matches(
              validateLinkString,
              "Можна використовувати лише латинські літери"
            ),
        })}
        onSubmit={(values) => {
          addSubcategoryRequest(values);
          setActive(false);
          // window.location.reload();
        }}
      >
        {({errors, touched, handleChange, handleSubmit, isValid, values}) => (
          <Form>
            <div className={styles.form}>
              <div>
                <label htmlFor="name">
                  <h6 className={styles.optionName}>Назва підкатегорії</h6>
                </label>
                <Field
                  name="name"
                  type="text"
                  className={styles.field}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <div className={styles.error}>{errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="linkKey">
                  <h6 className={styles.optionName}>URL</h6>
                </label>
                <Field
                  name="linkKey"
                  type="text"
                  className={styles.field}
                  onChange={handleChange}
                />
                {touched.linkKey && errors.linkKey && (
                  <div className={styles.error}>{errors.linkKey}</div>
                )}
              </div>
              <div className={styles.togglerContainer}>
                <Toggler/>
              </div>
              <div className={styles.violetButton}>
                <VioletButton
                  onClickFunction={handleSubmit}
                  type={"submit"}
                  buttonText={"ДОДАТИ"}
                  disabled={!isValid || !values.name || !values.linkKey}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addSubcategoryRequest: (data) =>
    dispatch(actionCreators.addSubcategoryRequest(data)),
});

export default connect(null, mapDispatchToProps)(AddSubcategoryPopup);

