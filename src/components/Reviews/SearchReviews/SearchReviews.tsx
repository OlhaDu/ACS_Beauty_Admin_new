import React from "react"
import { GoSearch } from "react-icons/go"
import s from "./SearchReviews.module.scss"
import { DebounceInput } from "react-debounce-input"
import { Values } from "src/types/Reviews"

const SearchReviews: React.FC<Values> = ({ onSearch }) => {
  return (
    <div className={s.FormSearch}>
      <DebounceInput
        minLength={1}
        debounceTimeout={300}
        onChange={e => onSearch(e.target.value)}
        className={s.foundReview}
      />
      <GoSearch className={s.inputIcon} />
    </div>
  )
}

export default SearchReviews
