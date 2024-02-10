import React, { useState, useRef } from "react"
import s from "./FilterProperties.module.scss"
import NavigateIcon from "src/images/svg/NavigateIcon"
import FilterIcon from "src/images/svg/FilterIcon"
import ArrowIcon from "src/images/svg/ArrowIcon"
import useFilterEffect from "src/hooks/useFilterOnClickOutside"
import { statusOptions, ratingOptions } from "./menuPotions";
interface IProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>
  setRating: React.Dispatch<React.SetStateAction<string>>
}

const FilterProperties: React.FC<IProps> = ({ setStatus, setRating }) => {
  const [statusOpen, setStatusOpen] = useState(false)
  const [ratingOpen, setRatingOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)
  const filterButtonRef = useRef<HTMLSpanElement>(null)

  

  const toggleStatus = () => {
    setStatusOpen(!statusOpen)
  }

  const toggleRating = () => {
    setRatingOpen(prevRatingOpen => !prevRatingOpen)
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
  }

  useFilterEffect(filterOpen, filterRef, filterButtonRef, toggleFilter)

  return (
    <>
      <div className={s.menu_filter}>
        <FilterIcon />
        Фільтрувати
        <span ref={filterButtonRef} className={s.menu_arrow} onClick={toggleFilter}>
          <ArrowIcon rotated={filterOpen} />
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
                  {statusOptions.map(option => (
                    <li key={option.value}>
                      <p className={s.sub_sub_menu_link} onClick={() => setStatus(option.value)}>
                        {option.label}
                      </p>
                    </li>
                  ))}
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
                  {ratingOptions.map(option => (
                    <li key={option.value}>
                      <p className={s.sub_sub_menu_link} onClick={() => setRating(option.value)}>
                        {option.label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default FilterProperties
