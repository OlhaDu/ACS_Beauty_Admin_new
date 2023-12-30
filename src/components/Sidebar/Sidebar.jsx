import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

import BoardIcon from "src/images/svg/BoardIcon";
import CategoriesIcon from "src/images/svg/CategoriesIcon";
import CommentsIcon from "src/images/svg/CommentsIcon";
import ListIcon from "src/images/svg/ListIcon";
import NewsIcon from "src/images/svg/NewsIcon";
import OrdersIcon from "src/images/svg/OrdersIcon";
import ProductsIcon from "src/images/svg/ProductsIcon";
import ReviewsIcon from "src/images/svg/ReviewsIcon";
import SlidesIcon from "src/images/svg/SlidesIcon";
import UsersIcon from "src/images/svg/UsersIcon";

const Sidebar = () => {
  const mainColor = "#5C5E60";
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/dashboard" className={styles.sidebarLink}>
          <div className={styles.icon}>
            <BoardIcon color={mainColor} />
          </div>{" "}
          Дошка
        </Link>
        <Link to="/categories">
          <div className={styles.icon}>
            <CategoriesIcon color={mainColor} />
          </div>{" "}
          Категорії
        </Link>
        <Link to="/products">
          <div className={styles.icon}>
            <ProductsIcon color={mainColor} />
          </div>{" "}
          Товари
        </Link>
        <Link to="/users">
          <div className={styles.icon}>
            <UsersIcon color={mainColor} />
          </div>{" "}
          Користувачі
        </Link>
        <Link to="/comments">
          <div className={styles.icon}>
            <CommentsIcon color={mainColor} />
          </div>{" "}
          Коментарі
        </Link>
        <Link to="/reviews">
          <div className={styles.icon}>
            <ReviewsIcon color={mainColor} />
          </div>{" "}
          Відгуки
        </Link>
        <Link to="/orders">
          <div className={styles.icon}>
            <OrdersIcon color={mainColor} />
          </div>{" "}
          Замовлення
        </Link>
        <Link to="/slides">
          <div className={styles.icon}>
            <SlidesIcon color={mainColor} />
          </div>{" "}
          Слайди
        </Link>
        <Link to="/news">
          <div className={styles.icon}>
            <NewsIcon color={mainColor} />
          </div>{" "}
          Новини
        </Link>
        <Link to="/promotions">
          <div className={styles.icon}>
            <ListIcon color={mainColor} />
          </div>{" "}
          Акції
        </Link>
        <Link to="/new-products">
          <div className={styles.icon}>
            <ListIcon color={mainColor} />
          </div>{" "}
          Новинки
        </Link>
        <Link to="/brands">
          <div className={styles.icon}>
            <ListIcon color={mainColor} />
          </div>{" "}
          Бренди
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
