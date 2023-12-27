import React, { useState, FocusEvent, ChangeEvent } from "react";
import styles from "./SearchInput.module.scss";
import SearchIcon from "src/images/svg/SearchIcon";

const SearchInput: React.FC = () => {
  
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputFocus = (): void => {
    setInputFocused(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (!e.target.value) {
      setInputFocused(false);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {};

  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        placeholder=" "
        className={styles.searchInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // onChange={handleChange}
      />
      <SearchIcon
        className={styles.searchIcon}
        style={{ display: isInputFocused ? "none" : "block" }}
      />
    </div>
  );
};

export default SearchInput;
