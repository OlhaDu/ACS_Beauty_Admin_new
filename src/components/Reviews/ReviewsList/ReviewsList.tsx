import React, { useState, useEffect } from "react"
// import ReviewsItems from "../ReviewsItems/ReviewsItems"
import s from "./ReviewsList.module.scss"
import SearchInput from "src/components/ToolsPanel/SearchInput/SearchInput"
import ExportList from "src/components/Reviews/ExportList/ExportList"
import AdminLayout from "src/layouts/AdminLayout"
import FilterProperties from "../FilterProperties/FilterProperties"
import Content from "src/components/Reviews/PaginationItem/PaginationItem"
// import ReviewsOnPage from "../ReviewsOnPage/ReviewsOnPage"
import { Review } from "src/types/Reviews"
import { getReviews } from "src/redux/reviews/operations"
import { useAppDispatch } from "src/redux/store"
import  ReviewsTable  from "src/components/Reviews/ReviewsItems/ReviewsTable";

const ReviewsList: React.FC = () => {
  const [newReviews, setNewReviews] = useState<Review[]>([])
  // const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">("pending")  
  // const [numberReviews, setNumberReviews] = useState<"10" | "25" | "50" | "100" | "4">("10")
  // const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchName, setSearchName] = useState("")
console.log("pageSize", pageSize)
console.log("page", page)
  const dispatch = useAppDispatch()

  useEffect(() => {
     dispatch(getReviews({
          lookup: searchName,
          pageSize,
          page: page + 1,
        }));   
   
  }, [dispatch, searchName, pageSize, page]);

  // const handleSearch = async (term: string) => {
  //   setSearchTerm(term)
  // }

  // const updateReviewsData = async () => {
  //   try {
  //     setStatus("pending")
  //     await dispatch(fetchReviews(1))
  //     setStatus("fulfilled")
  //   } catch (error) {
  //     setStatus("rejected")
  //   }
  // }

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
        <SearchInput onChange={setSearchName} />

        <ul className={s.menu_list}>
          <li>
            <FilterProperties />
          </li>
          <li className={s.menu_filter}>
            <ExportList />
          </li>
          <li className={s.countPageLi}>
            {/* <ReviewsOnPage
              onNumberReviewsChange={numberReviews => {
                setNumberReviews(numberReviews)
              }}
            /> */}
          </li>
        </ul>

          <ReviewsTable
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          />
          {/* <ReviewsItems updateReviewsData={updateReviewsData} searchTerm={searchTerm} /> */}
    
        <div className={s.paginationStyle}>
          <Content numberReviews={pageSize} onPageChange={handlePageChange} />
        </div>
        
      </div>
    </AdminLayout>
  )
}

export default ReviewsList
