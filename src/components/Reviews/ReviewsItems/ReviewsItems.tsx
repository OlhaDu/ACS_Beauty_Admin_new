import React, { useEffect, useState } from "react";
import s from "./ReviewItems.module.scss";
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

  ratingFilter?: "positive" | "neutral" | "negative";
  statusFilter?: "pending" | "published" | undefined;
  updateReviewsData: () => void;
  searchTerm: string;
}

const ReviewsItems: React.FC<ReviewsItemsProps> = ({
  reviews,

  ratingFilter,
  statusFilter,
  updateReviewsData,
  searchTerm,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
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

  const filteredByRating = ratingFilter
    ? reviews.filter((review) => matchesFilter(review.rating, ratingFilter))
    : reviews;

  const filteredByStatus = statusFilter
    ? filteredByRating.filter((review) =>
        filterStatus(review.status, statusFilter)
      )
    : filteredByRating;

  return (
    <div className={s.container}>
      <ul className={s.review_item}>
        <li className={s.review_item_title}>
          <p>id</p>
          <p>Назва товару</p>
          <p>Автор</p>
          <p>Відгук</p>
          <p>Рейтинг</p>
          <p>Створено</p>
          <p>Статус</p>
          <p>Дії</p>
        </li>

        {filteredByStatus
          .filter((review) => {
            const idMatch = review.id
              ? review.id.toString().toLowerCase().includes(searchTerm)
              : false;
            const firstNameMatch = review.firstName
              ? review.firstName.toLowerCase().includes(searchTerm)
              : false;
            const lastNameMatch = review.lastName
              ? review.lastName.toLowerCase().includes(searchTerm)
              : false;
            const productNameMatch = review.productName
              ? review.productName.toLowerCase().includes(searchTerm)
              : false;
            const reviewMatch = review.review
              ? review.review.toLowerCase().includes(searchTerm)
              : false;

            return (
              (searchTerm &&
                (idMatch ||
                  firstNameMatch ||
                  lastNameMatch ||
                  productNameMatch ||
                  reviewMatch)) ||
              !searchTerm
            );
          })
          .map((review) => (
            <li key={review.id}>
              <p>{review.id}</p>
              <p className={s.review_item_text}>{review.productName}</p>
              <div className={s.review_item_name}>
                <p>
                  {review.firstName} {review.lastName}
                </p>
              </div>

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
