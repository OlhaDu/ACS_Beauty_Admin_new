import React, { useState, useEffect } from "react";
import ReviewsItems from "./ReviewsItems";
import { fetchReviews } from "../api/getReviews";
import s from "./ReviewsList.module.scss";
import { Formik, Field, Form } from "formik";
import { GoSearch } from "react-icons/go";

const ReviewsList: React.FC = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">(
    "pending"
  );

  useEffect(() => {
    (async () => {
      try {
        setStatus("pending");
        const fetchedData = await fetchReviews();
        setStatus("fulfilled");
        setData(fetchedData);
      } catch (error) {
        setStatus("rejected");
      }
    })();
  }, []);

  return (
    <div className={s.container}>
      <h2>Відгуки</h2>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className={s.FormSearch}>
          <Field name="name" type="text" className={s.foundReview} />

          <button title="SearchButton" type="submit" className={s.BtnSearch}>
            <GoSearch style={{ width: "24px", height: "24px" }} />
          </button>
        </Form>
      </Formik>
      <nav className={s.menu}>
        <ul className={s.menu_list}>
          <li>
            <li>
              <a href="" className={s.menu_link}>
                Статус
              </a>
              <ul className={s.sub_menu_list}>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Опубліковано
                  </a>
                </li>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Очікує публікації
                  </a>
                </li>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    На перевірці
                  </a>
                </li>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Видалений
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="" className={s.menu_list}>
                Рейтинг
              </a>
              <ul className={s.sub_menu_list}>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Позитивні
                  </a>
                </li>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Нейтральні
                  </a>
                </li>
                <li>
                  <a href="" className={s.sub_menu_link}>
                    Негативні
                  </a>
                </li>
              </ul>
              <ul></ul>
            </li>
          </li>
          <li>
            <ul className={s.menu_list}>
                <li>
                <a href="" className={s.menu_link}>
                Змінити статус
              </a>
                </li>
                <li>
                <a href="" className={s.menu_link}>
                Видалити
              </a> 
                </li>
                
            </ul>
          </li>
          <li></li>
        </ul>
      </nav>
      {/* <label htmlFor="searchInput" title="Search for reviews"></label>
            <input type="text" name="searchInput" id="searchInput" className={s.foundReview}/> */}
      {status === "pending" && <p>Loading...</p>}
      {status === "rejected" && <p>Failed to fetch data.</p>}
      {status === "fulfilled" && <ReviewsItems reviews={data || []} />}
    </div>
  );
};

export default ReviewsList;
