import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

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
interface ContentProps {
  reviews: Review[];
  numberReviews: string | undefined;
  onPageChange: (currentReviews: Review[]) => void;
}
const Content: React.FC<ContentProps> = ({
  reviews,
  numberReviews,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const reviewsPerPage = parseInt(numberReviews || "1", 10);

  useEffect(() => {
    const indexOfLastProduct = currentPage * reviewsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - reviewsPerPage;

    const currentReviews = reviews?.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    if (currentReviews && currentReviews.length > 0) {
      onPageChange(currentReviews);
    }
  }, [location.search, reviews, reviewsPerPage, currentPage, onPageChange]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    queryParams.set("page", newPage.toString());
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <Pagination
      page={currentPage}
      count={Math.ceil(reviews?.length / reviewsPerPage || 1)}
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${location.pathname}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Content;
