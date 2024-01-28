import React, { useState, useCallback } from "react";
import s from "./ReviewsOnPage.module.scss";
import FormatListNumberIcon from "src/assets/FormatListNumberIcon";
import ArrowIcon from "src/assets/menu-arrow.svg";

interface ReviewsOnPageProps {
  onNumberReviewsChange: (numberReviews: "10" | "20" | "50" | "100" | "4") => void;
}

const ReviewsOnPage: React.FC<ReviewsOnPageProps> = ({
  onNumberReviewsChange,
}) => {
  const [countOpen, setCountOpen] = useState(false);
  const [numberReviews, setNumberReviews] = useState<
    "10" | "20" | "50" | "100" |"4"
  >("10");

  const toggleCount = useCallback(() => {
    setCountOpen((prevCountOpen) => !prevCountOpen);
  }, []);

  const handleReviewsNumber = (numberReviews: "10" | "20" | "50" | "100" | "4") => {
    onNumberReviewsChange(numberReviews);
    setNumberReviews(numberReviews);
    toggleCount();
  };

  return (
    <div className={s.menu_filter}>
      <FormatListNumberIcon />
      Рядків на сторінці: {numberReviews}
      <span
        className={`${s.menu_arrow} 
              ${countOpen ? s.menu_arrow_rotated : ""}`}
        onClick={toggleCount}
      >
        <ArrowIcon />
      </span>
      {countOpen && (
        <div className={s.styleItems}>
          <p onClick={() => handleReviewsNumber("4")}>10</p>
          <p onClick={() => handleReviewsNumber("20")}>20</p>
          <p onClick={() => handleReviewsNumber("50")}>50</p>
          <p onClick={() => handleReviewsNumber("100")}>100</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsOnPage;
