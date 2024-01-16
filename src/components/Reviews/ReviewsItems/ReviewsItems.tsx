import React, { useEffect, useState } from "react";
import s from "./ReviewItems.module.scss";
import CheckboxIcon from "src/assets/checkbox.svg";
import StarIcon from "src/images/svg/StarIcon";
import ChangeIcon from "src/images/svg/ChangeIconTS";
import DeleteIcon from "src/images/svg/DeleteIconTS";
import { ModalSample } from "../Modal/Modal";
import ChangeStatus from "../Modal/ChangeStatusModal";
import {
  changeStatus,
  deleteReviews,
} from "src/components/Utils/api/getReviews";
import { toast } from "react-toastify";
import {
  matchesFilter,
  filterStatus,
} from "src/components/Utils/api/matchesFilter";

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
  ratingFilter?: "positive" | "neutral" | "negative";
  statusFilter?: "pending" | "published";
  updateReviewsData: () => void;
}

const ReviewsItems: React.FC<ReviewsItemsProps> = ({
  reviews,
  selectedReviews,
  onSelectedReviewsChange,
  ratingFilter,
  statusFilter,
  updateReviewsData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  // const [selectedRating, setSelectedRating] = useState<number>();
  // const [selectedReview, setSelectedReview] = useState<string>();
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">(
    "pending"
  );

  useEffect(() => {
    if (status === "rejected") {
      toast.error(
        "Failed to fetch data, please reload the page or try again later",
        {
          theme: "colored",
        }
      );
    }
  }, [status]);

  const updateStatus = async (selectedStatus: string) => {
    try {
      setStatus("pending");
      const credentials = {
        status: selectedStatus,
      };
      await changeStatus(selectedProductId, credentials);
      setStatus("fulfilled");
      updateReviewsData();      
    } catch {
      setStatus("rejected");
    }
  };

  const handleRemoveNotice = async (id: string) => {
      try {
        setStatus("pending");

        await deleteReviews(id);
       
        setStatus("fulfilled");
        updateReviewsData();
        // const updatedReviews = reviews.filter((review) => review.id !== id);
        // onSelectedReviewsChange(updatedReviews.map((review) => review.id));
      } catch {
        setStatus("rejected");
      }
    };


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onChangeModal =
    (productId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setSelectedProductId(productId);
      toggleModal();
    };

  const handleSaveChangeStatus = (status: string) => {
    toggleModal();
    updateStatus(status);
  };

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

  const filteredByRating = ratingFilter
    ? reviews.filter((review) => matchesFilter(review.rating, ratingFilter))
    : reviews;

  // Фильтр по статусу
  const filteredByStatus = statusFilter
    ? filteredByRating.filter((review) =>
        filterStatus(review.status, statusFilter)
      )
    : filteredByRating;

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
          <p>Дії</p>
        </li>

        {filteredByStatus.map((review) => (
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
                onChange={() => {
                  toggleReviewSelection(review.id);
                }}
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
            <div className={s.actionIcon}>
              <a onClick={onChangeModal(review.id)}>
                <ChangeIcon fill={"black"} />
              </a>
              <a onClick={() => handleRemoveNotice(review.id)}>
                <DeleteIcon fill={"black"} width={52} height={52} />
              </a>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <ModalSample toggleModal={toggleModal}>
          <ChangeStatus
            onSave={handleSaveChangeStatus}
            onClose={() => toggleModal()}
          />
        </ModalSample>
      )}
    </div>
  );
};
export default ReviewsItems;
