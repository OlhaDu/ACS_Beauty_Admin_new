import React from "react";
import s from "./ReviewItems.module.scss";
import CheckboxIcon from "src/assets/checkbox.svg";
import StarIcon from "src/images/svg/StarIcon";

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
  selectedReviews: string[];
  onSelectedReviewsChange: (updatedSelectedReviews: string[]) => void;
}
const ReviewsItems: React.FC<ReviewsItemsProps> = ({ reviews, selectedReviews, onSelectedReviewsChange}) => {

  // const [selectedReviews, setSelectedReviews] = useState<string[]>([])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const toggleReviewSelection = (id: string) => {
    const updatedSelectedReviews = selectedReviews.includes(id)
      ? selectedReviews.filter((selectedId) => selectedId !== id)
      : [...selectedReviews, id];

    onSelectedReviewsChange(updatedSelectedReviews);
  };

// 
  const isSelected = (id: string) => selectedReviews.includes(id);
 
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
                checked={isSelected(review.id)}
                onChange={()=> {toggleReviewSelection(review.id)}}
              />
              <span className={s.custom_checkbox}>
                <CheckboxIcon />
              </span>
            </label>
            <p>{review.id}</p>
            <p className={s.review_item_text}>{review.productName}</p>
            <p className={s.review_item_name}>
              {review.firstName} {review.lastName}
            </p>
            <p className={s.review_item_text}>{review.review}</p>
            <p>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <StarIcon
                  key={index}
                  fill={index < review.rating ? "black" : "white"}
                />
              ))}             
            </p>
            <p>{formatDate(review.createdAt)}</p>
            <p>{review.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewsItems;
