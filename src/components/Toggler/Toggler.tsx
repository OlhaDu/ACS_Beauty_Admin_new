import s from "./Toggler.module.scss";
import { useFormikContext } from "formik";

const Toggler = () => {
  const { setFieldValue, values } = useFormikContext<{ enabled: boolean }>();

  const toggleElement = () => {
    setFieldValue("enabled", !values.enabled);
  };
  return (
    <div className={s.container}>
      <h5>Відображення</h5>
      <button
        type="button"
        className={`${s.toggle} ${values.enabled ? s.toggleActive : ""}`}
        onClick={toggleElement}
      >
        <div className={s.toggleCircle}></div>
        {values.enabled ? <p>Увiмкнено</p> : <p>Вимкнено</p>}
      </button>
    </div>
  );
};

export default Toggler;
