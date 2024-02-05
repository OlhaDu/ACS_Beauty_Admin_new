import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik"
import s from "./FormGenerator.module.scss"
import VioletButton from "../Buttons/VioletButton"
import { Fragment } from "react"
import cn from "classnames"
import { IForm } from "src/types/common"

const FormGenerator = <T extends FormikValues>(props: IForm<T>) => {
  const { initialValues, validationSchema, groups, onSubmit, btnName } = props
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {props => {
        const { isValid, dirty } = props
        const btnClasses = cn(s.button, { [s.disabled]: !dirty || !isValid })
        return (
          <Form className={s.form}>
            {groups.map(({ group, fields }, ind) => (
              <Fragment key={ind}>
                {group && <h5 className={s.subTitle}>{group}</h5>}
                {fields.map(({ name, label, as, className, component: Component }, ind) => {
                  const fieldClasses = cn(s.field, className)
                  return (
                    <Fragment key={ind}>
                      {!Component && name && (
                        <>
                          {label && (
                            <label htmlFor={name} className={s.label}>
                              {label}
                            </label>
                          )}
                          <Field
                            id={name}
                            {...{ as }}
                            name={name}
                            type="text"
                            className={fieldClasses}
                            autoComplete="off"
                          />
                          <ErrorMessage name={name} component="p" className={s.error} />
                        </>
                      )}
                      <>{Component}</>
                    </Fragment>
                  )
                })}
              </Fragment>
            ))}
            <VioletButton
              type="submit"
              title={btnName}
              disabled={!isValid || !dirty}
              className={btnClasses}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export default FormGenerator
