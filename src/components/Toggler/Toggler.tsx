import cn from "classnames"
import s from "./Toggler.module.scss"
import { useFormikContext } from "formik"

const Toggler = () => {
  const { setFieldValue, values } = useFormikContext<{ enabled: boolean }>()

  const btnClasses = cn(s.toggle, { [s.toggleActive]: values.enabled })

  const toggleElement = () => {
    setFieldValue("enabled", !values.enabled)
  }
  return (
    <div className={s.container}>
      <h5>Відображення</h5>
      <button type="button" className={btnClasses} onClick={toggleElement}>
        <div className={s.toggleCircle}></div>
        <p>{values.enabled ? "Увiмкнено" : "Вимкнено"}</p>
      </button>
    </div>
  )
}

export default Toggler
