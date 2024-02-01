import React, { useState, useEffect } from "react"
import ReviewsItems from "../ReviewsItems/ReviewsItems"
import s from "./ReviewsList.module.scss"
import SearchReviews from "src/components/Reviews/SearchReviews/SearchReviews"
import ExportList from "src/components/Reviews/ExportList/ExportList"
import AdminLayout from "src/layouts/AdminLayout"
import FilterProperties from "../FilterProperties/FilterProperties"
import Content from "src/components/Reviews/PaginationItem/PaginationItem"
import ReviewsOnPage from "../ReviewsOnPage/ReviewsOnPage"
import { Review } from "src/types/Reviews"
import { fetchReviews } from "src/redux/reviews/operations"
import { useAppDispatch } from "src/redux/store"

const ReviewsList: React.FC = () => {
  const [newReviews, setNewReviews] = useState<Review[]>([])
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">("pending")  
  const [numberReviews, setNumberReviews] = useState<"10" | "20" | "50" | "100" | "4">("10")
  const [searchTerm, setSearchTerm] = useState("")

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("pending")
        await dispatch(fetchReviews(1))
        setStatus("fulfilled")
      } catch (error) {
        setStatus("rejected")
      }
    }

    fetchData()
  }, [dispatch])

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
  }

  const updateReviewsData = async () => {
    try {
      setStatus("pending")
      await dispatch(fetchReviews(1))
      setStatus("fulfilled")
    } catch (error) {
      setStatus("rejected")
    }
  }

  const handlePageChange = (currentReviews: Review[]) => {
    if (!areReviewsEqual(newReviews, currentReviews)) {
      setNewReviews(currentReviews)
    }
  }

  const areReviewsEqual = (reviewsA: Review[], reviewsB: Review[]): boolean => {
    if (reviewsA.length !== reviewsB.length) {
      return false
    }

    for (let i = 0; i < reviewsA.length; i++) {
      if (reviewsA[i].id !== reviewsB[i].id) {
        return false
      }
    }

    return true
  }

  return (
    <AdminLayout>
      <div className={s.container}>
        <h2>Відгуки</h2>
        <SearchReviews onSearch={handleSearch} />

        <ul className={s.menu_list}>
          <li>
            <FilterProperties />
          </li>
          <li className={s.menu_filter}>
            <ExportList />
          </li>
          <li className={s.countPageLi}>
            <ReviewsOnPage
              onNumberReviewsChange={numberReviews => {
                setNumberReviews(numberReviews)
              }}
            />
          </li>
        </ul>

        {status === "pending" && <p>Loading...</p>}
        {status === "rejected" && <p>Failed to fetch data.</p>}
        {status === "fulfilled" && (
          <ReviewsItems updateReviewsData={updateReviewsData} searchTerm={searchTerm} />
        )}
        <div className={s.paginationStyle}>
          <Content numberReviews={numberReviews} onPageChange={handlePageChange} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default ReviewsList
