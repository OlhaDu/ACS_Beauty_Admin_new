import { Field, Form, Formik, FormikValues } from "formik";
import s from "./FormGenerator.module.scss";
import Toggler from "../Toggler/Toggler";
import VioletButton from "../VioletButton";
import { Fragment, ReactNode } from "react";
import { IForm } from "src/types";

const FormGenerator = <T extends FormikValues>(props: IForm<T>) => {
  const {
    initialValues,
    validationSchema,
    groups,
    onSubmit,
    isToggler = false,
  } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const { errors, touched, isValid, dirty } = props;

        return (
          <Form className={s.form}>
            {groups.map(({ group, fields }, ind) => (
              <Fragment key={ind}>
                {group && <h5 className={s.subTitle}>{group}</h5>}
                {fields.map(
                  (
                    { name, label, as, className, component: Component },
                    ind
                  ) => {
                    if (!Component && name) {
                      return (
                        <Fragment key={ind}>
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
                            className={`${s.field} ${className}`}
                          />
                          {touched[name] && errors[name] && (
                            <p className={s.error}>
                              {errors[name] as ReactNode}
                            </p>
                          )}
                        </Fragment>
                      );
                    }
                    if (Component) {
                      return <Fragment key={ind}>{Component}</Fragment>;
                    }
                  }
                )}
              </Fragment>
            ))}
            {isToggler && <Toggler />}
            <VioletButton
              type="submit"
              title="ДОДАТИ"
              disabled={!isValid || !dirty}
              className={`${s.button} ${(!dirty || !isValid) && s.disabled}`}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGenerator;
