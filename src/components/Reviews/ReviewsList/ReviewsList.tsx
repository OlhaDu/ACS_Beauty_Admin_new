import React, { useState, useEffect } from "react";
import ReviewsItems from "../ReviewsItems/ReviewsItems";
import { fetchReviews } from "../../Utils/api/getReviews";
import s from "./ReviewsList.module.scss";
import { Formik, Field, Form } from "formik";
import { GoSearch } from "react-icons/go";
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
  
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  const handleSelectedReviews = (updatedSelectedReviews: string[]) => {
    setSelectedReviews(updatedSelectedReviews);
  };
  console.log("statusFilter", statusFilter);

  const toggleFilter = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setFilterOpen(!filterOpen);
  };

  const toggleExport = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setExportOpen((prevExportOpen) => !prevExportOpen);
  };

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
  
  const reviews = data;

  const selectedProducts = reviews
    ? reviews.filter((review) => selectedReviews.includes(review.id))
    : [];
  console.log("selectedProducts", selectedProducts);

  return (
    <AdminLayout>
      <div className={s.container}>
        <h2>Відгуки</h2>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className={s.FormSearch}>
            <Field name="name" type="text" className={s.foundReview} />

            <button title="SearchButton" type="submit" className={s.BtnSearch}>
              <GoSearch style={{ width: "24px", height: "24px" }} />
            </button>
          </Form>
        </Formik>
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
              {filterOpen &&  <FilterProperties
        filterOpen={filterOpen}
        onRatingFilterChange={(filter) => {
          setRatingFilter(filter);
        }}
        onStatusFilterChange={(statusFilter) => {
          setStatusFilter(statusFilter);
        }}
      /> }
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
            selectedReviews={selectedReviews}
            onSelectedReviewsChange={handleSelectedReviews}
            ratingFilter={ratingFilter}
            statusFilter={statusFilter}
            updateReviewsData={updateReviewsData}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewsList;
