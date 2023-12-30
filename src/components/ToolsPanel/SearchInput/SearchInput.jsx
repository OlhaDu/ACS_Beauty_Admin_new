import React, { useState } from "react";
import styles from "./SearchInput.module.scss";
// import SearchIcon from "../../../svgs/SearchIcon";
import SearchIcon from "src/images/svg/SearchIcon";

const SearchInput = () => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = (e) => {
    if (!e.target.value) {
      setInputFocused(false);
    }
  };
  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        placeholder=" "
        className={styles.searchInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <SearchIcon
        className={styles.searchIcon}
        style={{ display: isInputFocused ? "none" : "block" }}
      />
    </div>
  );
};

export default SearchInput;
