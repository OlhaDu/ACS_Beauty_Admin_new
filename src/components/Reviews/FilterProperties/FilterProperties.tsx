import React, { useState, useEffect, useRef, useCallback } from "react";
import s from "./FilterProperties.module.scss";
import NavigateIcon from "src/images/svg/NavigateIcon";
import FilterIcon from "src/assets/filter-variant.svg";
import ArrowIcon from "src/assets/menu-arrow.svg";

interface FilterPropertiesProps {
  // filterOpen: boolean;
  onRatingFilterChange: (
    filter: "positive" | "neutral" | "negative" | undefined
  ) => void;
  onStatusFilterChange: (statusFilter:"pending" | "published" | undefined) => void;
}

const FilterProperties: React.FC<FilterPropertiesProps> = ({
  // filterOpen,
  onRatingFilterChange,
  onStatusFilterChange,
 
}) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLSpanElement>(null);

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
       <li>
         <p className={s.sub_sub_menu_link} onClick={() => handleStatusFilterChange(undefined)}>
           Всі
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
       <li>
         <p
           className={s.sub_sub_menu_link}
           onClick={() => handleRatingFilterChange(undefined)}
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
