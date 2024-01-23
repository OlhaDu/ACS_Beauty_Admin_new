import React, { useState, useEffect, useRef, useCallback } from "react";
import ReviewsItems from "../ReviewsItems/ReviewsItems";
import { fetchReviews } from "../../Utils/api/getReviews";
import s from "./ReviewsList.module.scss";
import SearchReviews from "src/components/Reviews/SearchReviews/SearchReviews";
// import ControlledOpenSelect from "src/components/Reviews/ControlledOpenSelect/ControlledOpenSelect"
import FilterIcon from "src/assets/filter-variant.svg";
import ArrowIcon from "src/assets/menu-arrow.svg";
import ExportIcon from "src/assets/file-export.svg";
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
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

  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLSpanElement>(null);

  const toggleExport = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setExportOpen(!exportOpen);
  };

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

  const toggleFilter = useCallback(() => {
    setFilterOpen((prevFilterOpen) => !prevFilterOpen);
  }, []);
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const closeFilter = (e: MouseEvent) => {
      if (filterOpen && filterRef.current && filterButtonRef.current) {
        if (
          !filterRef.current.contains(e.target as Node) &&
          !filterButtonRef.current.contains(e.target as Node)
        ) {
          toggleFilter();
        }
      }
    };

    window.addEventListener("mousedown", closeFilter);

    return () => {
      window.removeEventListener("mousedown", closeFilter);
    };
  }, [toggleFilter, filterRef, filterButtonRef, filterOpen]);

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
            <div className={s.menu_filter}>
              <FilterIcon />
              Фільтрувати
              <span
                ref={filterButtonRef}
                className={`${s.menu_arrow} 
              ${filterOpen ? s.menu_arrow_rotated : ""}`}
                onClick={toggleFilter}
              >
                <ArrowIcon />
              </span>
            </div>
            <div ref={filterRef}>
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
            </div>
          </li>

          <li className={s.menu_filter}>
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
