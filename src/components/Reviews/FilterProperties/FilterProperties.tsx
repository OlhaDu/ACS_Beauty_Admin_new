import React, { useState, useEffect, useRef } from "react";
import s from "./FilterProperties.module.scss";
import NavigateIcon from "src/images/svg/NavigateIcon";

interface FilterPropertiesProps {
  filterOpen: boolean;
  onRatingFilterChange: (
    filter: "positive" | "neutral" | "negative" | undefined
  ) => void;
  onStatusFilterChange: (statusFilter:"pending" | "published" | undefined) => void;
}

const FilterProperties: React.FC<FilterPropertiesProps> = ({
  filterOpen,
  onRatingFilterChange,
  onStatusFilterChange,
}) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

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
  const handleRatingFilterChange = (
    filter: "positive" | "neutral" | "negative" | undefined
  ) => {
    onRatingFilterChange(filter);
  };

  const handleStatusFilterChange = (
    statusFilter:"pending" | "published" | undefined
  ) => {
    onStatusFilterChange(statusFilter);
  };

  return (
    <>
      <ul className={s.sub_menu_list}>
        <li>
          <p className={s.sub_menu_link}  onClick={toggleStatus}>
            Статус
            <span      
          >
            <NavigateIcon rotated={statusOpen}/>
          </span>
          </p>
          
          {statusOpen && (
            <ul className={s.sub_sub_menu_list}>
              <li>
                <p className={s.sub_sub_menu_link} onClick={() => handleStatusFilterChange('published')}>
                  Опубліковано
                </p>
              </li>
              <li>
                <p className={s.sub_sub_menu_link} onClick={() => handleStatusFilterChange('pending')}>
                  На перевірці
                </p>
              </li>
              {/* <li>
                <p className={s.sub_sub_menu_link}>
                  Видалений
                </p>
              </li> */}
            </ul>
          )}
        </li>
        <li>
          <p className={s.sub_menu_link} onClick={toggleRating}>
            Рейтинг
            <span
           >
            <NavigateIcon rotated={ratingOpen}/>
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
            </ul>
          )}
          <ul></ul>
        </li>
      </ul>
    </>
  );
};

export default FilterProperties;
