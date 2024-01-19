import React, { useState, useEffect } from "react";
import ReviewsItems from "../ReviewsItems/ReviewsItems";
import { fetchReviews } from "../../Utils/api/getReviews";
import s from "./ReviewsList.module.scss";
import SearchReviews from "src/components/Reviews/SearchReviews/SearchReviews";

import FilterIcon from "src/assets/filter-variant.svg";
import ArrowIcon from "src/assets/menu-arrow.svg";
import ExportIcon from "src/assets/file-export.svg";
import AdminLayout from "src/layouts/AdminLayout";
import FilterProperties from "../FilterProperties/FilterProperties";
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
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">(
    "pending"
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<
    "positive" | "neutral" | "negative" | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "published" | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilter = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setFilterOpen(!filterOpen);
  };

  const toggleExport = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setExportOpen((prevExportOpen) => !prevExportOpen);
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
  };
  console.log("searchTerm", searchTerm);

  useEffect(() => {
    (async () => {
      try {
        setStatus("pending");
        const fetchedData = await fetchReviews(1);
        setStatus("fulfilled");
        setData(fetchedData.rows);
      } catch (error) {
        setStatus("rejected");
      }
    })();
  }, []);

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

  return (
    <AdminLayout>
      <div className={s.container}>
        <h2>Відгуки</h2>
        <SearchReviews onSearch={handleSearch} />
        <nav className={s.menu}>
          <ul className={s.menu_list}>
            <li>
              <FilterIcon />
              Фільтрувати
              <span
                className={`${s.menu_arrow} 
              ${filterOpen ? s.menu_arrow_rotated : ""}`}
                onClick={toggleFilter}
              >
                <ArrowIcon />
              </span>
              {filterOpen && (
                <FilterProperties
                  filterOpen={filterOpen}
                  onRatingFilterChange={(filter) => {
                    setRatingFilter(filter);
                  }}
                  onStatusFilterChange={(statusFilter) => {
                    setStatusFilter(statusFilter);
                  }}
                />
              )}
            </li>

            <li>
              <ExportIcon />
              Експортувати
              <span
                className={`${s.menu_arrow} ${
                  exportOpen ? s.menu_arrow_rotated : ""
                }`}
                onClick={toggleExport}
              >
                <ArrowIcon />
              </span>
            </li>
          </ul>
        </nav>

        {status === "pending" && <p>Loading...</p>}
        {status === "rejected" && <p>Failed to fetch data.</p>}
        {status === "fulfilled" && (
          <ReviewsItems
            reviews={data || []}
            ratingFilter={ratingFilter}
            statusFilter={statusFilter}
            updateReviewsData={updateReviewsData}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewsList;
