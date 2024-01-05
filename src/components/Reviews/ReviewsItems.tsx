import React from "react";
import s from "./ReviewItems.module.scss";
import CheckboxIcon from "src/assets/checkbox.svg";

interface ReviewsItemsProps {
  reviews: {
    // "id": 0,
    //     "review": "string",
    //     "rating": 0,
    //     "status": "string",
    //     "firstName": "string",
    //     "lastName": "string",
    //     "productName": "string"
    id: string;
    firstName: string;
    lastName: string;
    productName: string;
    data: number;
    review: string;
    status: string;
    rating: 0;
  }[];
}

const ReviewsItems: React.FC<ReviewsItemsProps> = ({ reviews }) => {
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
            <input type="checkbox" name="item" id="item" className={s.real_checkbox}/>
            <span className={s.custom_checkbox}><CheckboxIcon /></span>
            </label>
          
          <p>01</p>
          <p>Спрей-тонер з пантенолом...</p>
          <p>Кузьменко Марина</p>
          <p>Дуже крутий засіб...</p>
          <p>Рейтинг</p>
          <p>12.06.2023</p>
          <p>На перевірці</p>
        </li>
      </ul>

      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.id}</p>
          <p>{review.productName}</p>
          <p> {review.firstName}{review.lastName}</p>  
          <p>{review.review}</p>      
          <p>{review.data}</p>
          <p>{review.status}</p>
          <p>{review.rating}</p>
        </div>
      ))}
    </div>
  );
};
export default ReviewsItems;
