import React from "react";
import styles from "./SearchInput.module.scss";
import SearchIcon from "src/images/svg/SearchIcon";

interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className={styles.searchIcon} />
    </div>
  );
};

export default SearchInput;
