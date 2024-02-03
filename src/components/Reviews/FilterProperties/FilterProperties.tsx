import React, { useState, useEffect, useRef, useCallback } from "react";
import s from "./FilterProperties.module.scss";
import NavigateIcon from "src/images/svg/NavigateIcon";
import FilterIcon from "src/assets/filter-variant.svg";
import ArrowIcon from "src/assets/menu-arrow.svg";
import { useAppDispatch } from "src/redux/store";
import { setRatingFilter, setStatusFilter } from "src/redux/reviews/reviewsSlice";

const FilterProperties = () => {

  const [statusOpen, setStatusOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLSpanElement>(null);

  const dispatch = useAppDispatch();

  const prevFilterOpenRef = useRef(filterOpen);
  useEffect(() => {
    if (prevFilterOpenRef.current === filterOpen && !filterOpen) {
      prevFilterOpenRef.current = filterOpen;
    }
  }, [filterOpen]);

  const toggleStatus = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setStatusOpen(!statusOpen);
  };

  const toggleRating = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setRatingOpen((prevRatingOpen) => !prevRatingOpen);
  };

  const toggleFilter = useCallback(() => {
    setFilterOpen((prevFilterOpen) => !prevFilterOpen);
  }, []);

  useEffect(() => {
    const closeFilter = (e: MouseEvent) => {
      if (filterOpen && filterRef.current && filterButtonRef.current) {
        if (
          !filterRef.current.contains(e.target as Node) &&
          !filterButtonRef.current.contains(e.target as Node)
        ) {
          toggleFilter();
        }
      }
    };

    window.addEventListener("mousedown", closeFilter);

    return () => {
      window.removeEventListener("mousedown", closeFilter);
    };
  }, [toggleFilter, filterRef, filterButtonRef, filterOpen]);

  const handleRatingFilterChange = (
    filter: "positive" | "neutral" | "negative" | "all"
  ) => {
    dispatch(setRatingFilter(filter));
  };

  const handleStatusFilterChange = (
    statusFilter: "pending" | "published" | "all"
  ) => {
    dispatch(setStatusFilter(statusFilter));
  };

  return (
    <>
      <div className={s.menu_filter}>
        <FilterIcon />
        Фільтрувати
        <span
          ref={filterButtonRef}
          className={`${s.menu_arrow} 
              ${filterOpen ? s.menu_arrow_rotated : ""}`}
          onClick={toggleFilter}
        >
          <ArrowIcon />
        </span>
      </div>
      <div ref={filterRef}>
        {filterOpen && (
          <ul className={s.sub_menu_list}>
            <li>
              <p className={s.sub_menu_link} onClick={toggleStatus}>
                Статус
                <span>
                  <NavigateIcon rotated={statusOpen} />
                </span>
              </p>

              {statusOpen && (
                <ul className={s.sub_sub_menu_list}>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleStatusFilterChange("published")}
                    >
                      Опубліковано
                    </p>
                  </li>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleStatusFilterChange("pending")}
                    >
                      На перевірці
                    </p>
                  </li>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleStatusFilterChange("all")}
                    >
                      Всі
                    </p>
                  </li>
                 
                </ul>
              )}
            </li>
            <li>
              <p className={s.sub_menu_link} onClick={toggleRating}>
                Рейтинг
                <span>
                  <NavigateIcon rotated={ratingOpen} />
                </span>
              </p>

              {ratingOpen && (
                <ul className={s.sub_sub_menu_list}>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleRatingFilterChange("positive")}
                    >
                      Позитивні
                    </p>
                  </li>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleRatingFilterChange("neutral")}
                    >
                      Нейтральні
                    </p>
                  </li>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleRatingFilterChange("negative")}
                    >
                      Негативні
                    </p>
                  </li>
                  <li>
                    <p
                      className={s.sub_sub_menu_link}
                      onClick={() => handleRatingFilterChange("all")}
                    >
                      Всі
                    </p>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterProperties;
