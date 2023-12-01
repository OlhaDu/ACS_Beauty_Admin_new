import React from "react";
import styles from "./Toggler.module.scss";
import { useFormikContext } from "formik";

const Toggler = () => {
  const formik = useFormikContext();

  const toggleElement = () => {
    formik.setFieldValue("disabled", !formik.values.disabled);
  };
  return (
    <div className={styles.container}>
      <h5>Відображення</h5>
      <button
        type="button"
        className={`${styles.toggle} ${
          formik.values.disabled ? styles.toggleActive : ""
        }`}
        onClick={toggleElement}
      >
        <div className={styles.toggleCircle}></div>
        {formik.values.disabled ? <h6>Увiмкнено</h6> : <h6>Вимкнено</h6>}
      </button>
    </div>
  );
};

export default Toggler;
