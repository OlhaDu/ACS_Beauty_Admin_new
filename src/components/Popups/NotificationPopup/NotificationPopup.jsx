import React from "react";
import styles from "./NotificationPopup.module.scss";
// import CommentsIcon from "../../../svgs/CommentsIcon";
import CommentsIcon from "src/images/svg/CommentsIcon";
// import NewOrderIcon from "../../../svgs/NewOrderIcon";
import NewOrderIcon from "src/images/svg/NewOrderIcon";

const NotificationPopup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span> У ВАС 15 НОВИХ СПОВІЩЕНЬ </span>
      </div>
      <ul>
        <li>
          <NewOrderIcon /> Нове замовлення від Клименко А.
        </li>
        <li>
          <CommentsIcon color={"#5c5e60"} /> Кузнецова М. додала коментар
        </li>
        <li>
          <NewOrderIcon /> Нове замовлення від Клименко А.
        </li>
        <li>
          <CommentsIcon color={"#5c5e60"} /> Кузнецова М. додала коментар
        </li>
        <li>
          <NewOrderIcon /> Нове замовлення від Клименко А.
        </li>
        <li>
          <CommentsIcon color={"#5c5e60"} /> Кузнецова М. додала коментар
        </li>
        <li>
          <NewOrderIcon /> Нове замовлення від Клименко А.
        </li>
        <li>
          <CommentsIcon color={"#5c5e60"} /> Кузнецова М. додала коментар
        </li>
      </ul>
    </div>
  );
};

export default NotificationPopup;
