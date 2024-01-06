import React, { useState, useEffect } from "react";
import ReviewsItems from "./ReviewsItems";
import { fetchReviews } from "../api/getReviews";
import s from "./ReviewsList.module.scss";
import { Formik, Field, Form } from "formik";
import { GoSearch } from "react-icons/go";
import FilterIcon from "src/assets/filter-variant.svg";
import GestureIcon from "src/assets/gesture-double.svg";
import ArrowIcon from "src/assets/menu-arrow.svg";
import ExportIcon from "src/assets/file-export.svg";
import NavigateIcon from "src/assets/navigate.svg";
import AdminLayout from "src/layouts/AdminLayout";

const ReviewsList: React.FC = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">(
    "pending"
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const toggleAction = () => {
    setActionOpen(!actionOpen);
  };

  const toggleExport = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setExportOpen((prevExportOpen) => !prevExportOpen);
  };

  const toggleStatus = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setStatusOpen((prevStatusOpen) => !prevStatusOpen);
  };

  const toggleRating = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setRatingOpen((prevRatingOpen) => !prevRatingOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        setStatus("pending");
        const fetchedData = await fetchReviews(1);
        setStatus("fulfilled");
        setData(fetchedData.rows);
        console.log("fetchedData", fetchedData.rows)
      } catch (error) {
        setStatus("rejected");
      }
    })();
  }, []);
  console.log("data", data)
  return (
    <AdminLayout>
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
              <FilterIcon />
              Фільтрувати
              <span
                className={`${s.menu_arrow} 
              ${filterOpen ? s.menu_arrow_rotated : ""}`}
                onClick={toggleFilter}
              >
                <ArrowIcon />
              </span>
              {filterOpen && (
                <ul className={s.sub_menu_list}>
                  <li>
                    <a href="" className={s.sub_menu_link}>
                      Статус
                    </a>
                    <span
                      className={`${s.menu_arrow_span} 
                    ${filterOpen ? s.menu_arrow_rotated : ""}`}
                      onClick={toggleStatus}
                    >
                      <NavigateIcon />
                    </span>
                    {statusOpen && (
                      <ul className={s.sub_sub_menu_list}>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Опубліковано
                          </a>
                        </li>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Очікує публікації
                          </a>
                        </li>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            На перевірці
                          </a>
                        </li>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Видалений
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <a href="" className={s.menu_link}>
                      Рейтинг
                    </a>
                    <span
                      className={`${s.menu_arrow_span} 
                     ${filterOpen ? s.menu_arrow_rotated : ""}`}
                      onClick={toggleRating}
                    >
                      <NavigateIcon />
                    </span>
                    {ratingOpen && (
                      <ul className={s.sub_sub_menu_list}>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Позитивні
                          </a>
                        </li>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Нейтральні
                          </a>
                        </li>
                        <li>
                          <a href="" className={s.sub_sub_menu_link}>
                            Негативні
                          </a>
                        </li>
                      </ul>
                    )}
                    <ul></ul>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <GestureIcon />
              Дії
              <span
                className={`${s.menu_arrow} ${
                  actionOpen ? s.menu_arrow_rotated : ""
                }`}
                onClick={toggleAction}
              >
                <ArrowIcon />
              </span>
              {actionOpen && (
                <ul className={s.sub_menu_list}>
                  <li>
                    <a href="" className={s.sub_menu_link}>
                      Змінити статус
                    </a>
                  </li>
                  <li>
                    <a href="" className={s.sub_menu_link}>
                      Видалити
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ExportIcon />
              Експортувати
              <span
                className={`${s.menu_arrow} ${
                  exportOpen ? s.menu_arrow_rotated : ""
                }`}
                onClick={toggleExport}
              >
                <ArrowIcon />
              </span>
            </li>
          </ul>
        </nav>
        {/* <label htmlFor="searchInput" title="Search for reviews"></label>
            <input type="text" name="searchInput" id="searchInput" className={s.foundReview}/> */}
        {status === "pending" && <p>Loading...</p>}
        {status === "rejected" && <p>Failed to fetch data.</p>}
        {status === "fulfilled" && <ReviewsItems reviews={data || []} />}        
      </div>
    </AdminLayout>
  );
};

export default ReviewsList;
