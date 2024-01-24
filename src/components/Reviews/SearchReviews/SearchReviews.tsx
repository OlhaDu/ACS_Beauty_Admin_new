import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { GoSearch } from "react-icons/go";
import s from "./SearchReviews.module.scss";
import debounce from "lodash/debounce";

interface SearchReviewsProps {
  onSearch: (term: string) => Promise<void>;
}
interface Values {
  search: string;
}

const SearchReviews: React.FC<SearchReviewsProps> = ({ onSearch }) => {
  const handleSearch = debounce(onSearch, 300);

  return (
    <>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(
          values: Values,
          { resetForm, setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
          resetForm();
        }}
      >
        {(formikProps) => (
          <Form autoComplete="off" className={s.FormSearch}>
            <Field
              name="search"
              type="text"
              className={s.foundReview}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log("e.target.value", e.target.value);
                handleSearch(e.target.value);
                formikProps.handleChange(e);
              }}
            />

            <button title="SearchButton" type="submit" className={s.BtnSearch}>
              <GoSearch style={{ width: "24px", height: "24px" }} />
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchReviews;
