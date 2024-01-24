import React, { useState, useEffect } from "react";
import ReviewsItems from "../ReviewsItems/ReviewsItems";
import { fetchReviews } from "../../Utils/api/getReviews";
import s from "./ReviewsList.module.scss";
import SearchReviews from "src/components/Reviews/SearchReviews/SearchReviews";
import ExportList from "src/components/Reviews/ExportList/ExportList";

import AdminLayout from "src/layouts/AdminLayout";
import FilterProperties from "../FilterProperties/FilterProperties";
import Content from "src/components/Reviews/PaginationItem/PaginationItem";
import ReviewsOnPage from "../ReviewsOnPage/ReviewsOnPage";
interface Review {
  id: string;
  firstName: string;
  lastName: string;
  productName: string;
  createdAt: string;
  review: string;
  status: string;
  rating: number;
}

const ReviewsList: React.FC = () => {
  const [data, setData] = useState<Review[]>([]);
  const [newReviews, setNewReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">(
    "pending"
  );
  const [ratingFilter, setRatingFilter] = useState<
    "positive" | "neutral" | "negative" | undefined
  >(undefined);
  const [numberReviews, setNumberReviews] = useState<
    "10" | "20" | "50" | "100"
  >("10");
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "published" | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setStatus("pending");
    fetchReviews(1)
      .then((fetchedData) => {
        setStatus("fulfilled");
        setData(fetchedData.rows);
      })
      .catch(() => {
        setStatus("rejected");
      });
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
  };

  const updateReviewsData = async () => {
    try {
      setStatus("pending");
      const fetchedData = await fetchReviews(1);
      setStatus("fulfilled");
      setData(fetchedData.rows);
    } catch (error) {
      setStatus("rejected");
    }
  };

  const handlePageChange = (currentReviews: Review[]) => {
    if (!areReviewsEqual(newReviews, currentReviews)) {
      console.log("currentReviews", currentReviews);
      setNewReviews(currentReviews);
    }
  };

  const areReviewsEqual = (reviewsA: Review[], reviewsB: Review[]): boolean => {
    if (reviewsA.length !== reviewsB.length) {
      return false;
    }

    for (let i = 0; i < reviewsA.length; i++) {
      if (reviewsA[i].id !== reviewsB[i].id) {
        return false;
      }
    }

    return true;
  };

  return (
    <AdminLayout>
      <div className={s.container}>
        <h2>Відгуки</h2>
        <SearchReviews onSearch={handleSearch} />

        <ul className={s.menu_list}>
          <li>
            <FilterProperties
              onRatingFilterChange={(filter) => {
                setRatingFilter(filter);
              }}
              onStatusFilterChange={(statusFilter) => {
                setStatusFilter(statusFilter);
              }}
            />
          </li>
          <li className={s.menu_filter}>
            <ExportList />
          </li>
          <li className={s.countPageLi}>
            <ReviewsOnPage
              onNumberReviewsChange={(numberReviews) => {
                setNumberReviews(numberReviews);
              }}
            />
          </li>
        </ul>

        {status === "pending" && <p>Loading...</p>}
        {status === "rejected" && <p>Failed to fetch data.</p>}
        {status === "fulfilled" && (
          <ReviewsItems
            reviews={newReviews || []}
            ratingFilter={ratingFilter}
            statusFilter={statusFilter}
            updateReviewsData={updateReviewsData}
            searchTerm={searchTerm}
          />
        )}
        <div className={s.paginationStyle}>
          <Content
            numberReviews={numberReviews}
            reviews={data || []}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsList;
