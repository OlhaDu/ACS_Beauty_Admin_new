import React from "react";
import s from "./ReviewItems.module.scss";
import CheckboxIcon from "src/assets/checkbox.svg";
// import { FiCheck } from "react-icons/fi";

interface ReviewsItemsProps {
  reviews: {
    id: string;
    firstName: string;
    lastName: string;
    productName: string;
    createdAt: string;
    review: string;
    status: string;
    rating: number;
  }[];
}

const ReviewsItems: React.FC<ReviewsItemsProps> = ({ reviews }) => {
  // const rows = ({reviews})
  console.log("first", reviews);

  return (
    <div className={s.container}>
      <ul className={s.review_item}>
        <li className={s.review_item_title}>
          <CheckboxIcon />
          <p>id</p>
          <p>Назва товару</p>
          <p>Автор</p>
          <p>Відгук</p>
          <p>Рейтинг</p>
          <p>Створено</p>
          <p>Статус</p>
        </li>
        <li>
          <label htmlFor="item" aria-label="Label for the checkbox">
            <input
              type="checkbox"
              name="item"
              id="item"
              className={s.real_checkbox}
            />
            <span className={s.custom_checkbox}>
              <CheckboxIcon />
            </span>
          </label>

          <p>01</p>
          <p>Спрей-тонер з пантенолом...</p>
          <p>Кузьменко Марина</p>
          <p>Дуже крутий засіб...</p>
          <p>Рейтинг</p>
          <p>12.06.2023</p>
          <p>На перевірці</p>
        </li>

        {reviews.map((review) => (
          <li key={review.id}>
            <label
              htmlFor={`item-${review.id}`}
              aria-label="Label for the checkbox"
            >
              <input
                type="checkbox"
                name={`item-${review.id}`}
                id={`item-${review.id}`}
                className={s.real_checkbox}
              />
              <span className={s.custom_checkbox}>
                <CheckboxIcon />
              </span>
            </label>
            <p>{review.id}</p>
            <p>{review.productName}</p>
            <p>
              {" "}
              {review.firstName} {review.lastName}
            </p>
            <p>{review.review}</p>
            <p>{review.rating}</p>
            <p>{review.createdAt}</p>
            <p>{review.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewsItems;
