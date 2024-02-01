import React, { useEffect, useState } from "react"
import s from "./ReviewItems.module.scss"
import StarIcon from "src/images/svg/StarIcon"
import ChangeIcon from "src/images/svg/ChangeIconTS"
import DeleteIcon from "src/images/svg/DeleteIconTS"
import { ModalSample } from "../Modal/Modal"
import ChangeStatus from "../Modal/ChangeStatusModal"
import { changeStatus, deleteReviews } from "src/components/Utils/api/getReviews"
import { toast } from "react-toastify"
import { ReviewsItemsProps } from "src/types/Reviews"
import {  useSelector } from "react-redux"
import { RootState } from "src/redux/store";
import { matchesFilter, filterStatus, formatDate } from "src/components/Utils/matchesFilter"
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  TableContainer,
  Box,
} from "@mui/material"


const cellStyles = {
  fontFamily: "Roboto",
  fontWeight: 400,
  padding: 0,
  paddingTop: 1.25,
  paddingBottom: 1.25,
  paddingLeft: 1,
  paddingRight: 1,
  fontSize: 16,
  margin: 0,
  color: " #5C5E60",
}

const ReviewsItems: React.FC<ReviewsItemsProps> = ({ 
  updateReviewsData,
  searchTerm,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [status, setStatus] = useState<"pending" | "fulfilled" | "rejected">("pending")
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null)
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const { ratingFilter, statusFilter } = useSelector((state: RootState) => state.reviews.filters);

  useEffect(() => {
    if (status === "rejected") {
      toast.error("Failed to fetch data, please reload the page or try again later", {
        theme: "colored",
      })
    }
  }, [status])

  const updateStatus = async (selectedStatus: string) => {
    try {
      setStatus("pending")
      const credentials = {
        status: selectedStatus,
      }
      await changeStatus(selectedProductId, credentials)
      setStatus("fulfilled")
      updateReviewsData()
    } catch {
      setStatus("rejected")
    }
  }

  const handleRemoveNotice = async (id: string) => {
    try {
      setStatus("pending")
      await deleteReviews(id)
      setStatus("fulfilled")
      updateReviewsData()
    } catch {
      setStatus("rejected")
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const onChangeModal = (productId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setSelectedProductId(productId)
    toggleModal()
  }

  const handleSaveChangeStatus = (status: string) => {
    toggleModal()
    updateStatus(status)
  }

  const filteredByRating = ratingFilter
    ? reviews.filter(review => matchesFilter(review.rating, ratingFilter))
    : reviews

  const filteredByStatus = statusFilter
    ? filteredByRating.filter(review => filterStatus(review.status, statusFilter))
    : filteredByRating

  return (
    <>
      <Box className={s.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className={s.review_item}>
            <TableHead className={s.review_item_title}>
              <TableRow className={s.class} sx={{ padding: 0, fontSize: 16, color: " #5C5E60" }}>
                <TableCell sx={{ ...cellStyles, paddingLeft: 3 }}>id</TableCell>
                <TableCell sx={{ ...cellStyles, width: 115 }}>Назва товару</TableCell>
                <TableCell sx={{ ...cellStyles }}>Автор</TableCell>
                <TableCell sx={{ ...cellStyles }}>Відгук</TableCell>
                <TableCell sx={{ ...cellStyles }}>Рейтинг</TableCell>
                <TableCell sx={{ ...cellStyles }}>Створено</TableCell>
                <TableCell sx={{ ...cellStyles }}>Статус</TableCell>
                <TableCell sx={{ ...cellStyles }}>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredByStatus
                .filter(review => {
                  const idMatch = review.id
                    ? review.id.toString().toLowerCase().includes(searchTerm)
                    : false
                  const firstNameMatch = review.firstName
                    ? review.firstName.toLowerCase().includes(searchTerm)
                    : false
                  const lastNameMatch = review.lastName
                    ? review.lastName.toLowerCase().includes(searchTerm)
                    : false
                  const productNameMatch = review.productName
                    ? review.productName.toLowerCase().includes(searchTerm)
                    : false
                  const reviewMatch = review.review
                    ? review.review.toLowerCase().includes(searchTerm)
                    : false

                  return (
                    (searchTerm &&
                      (idMatch ||
                        firstNameMatch ||
                        lastNameMatch ||
                        productNameMatch ||
                        reviewMatch)) ||
                    !searchTerm
                  )
                })
                .map(review => (
                  <TableRow
                    key={review.id}
                    onMouseEnter={() => setActiveReviewId(review.id)}
                    onMouseLeave={() => setActiveReviewId(null)}
                  >
                    <TableCell sx={{ ...cellStyles, width: 35, paddingLeft: 3 }}>
                      {review.id}
                    </TableCell>
                    <TableCell className={s.review_item_text} sx={{ ...cellStyles, width: 105 }}>
                      {review.productName}
                    </TableCell>
                    <TableCell
                      sx={{ ...cellStyles }}
                      className={s.review_item_name}
                      onMouseEnter={() => setActiveReviewId(review.id)}
                      onMouseLeave={() => setActiveReviewId(null)}
                    >
                      {" "}
                      {review.firstName} {review.lastName}
                    </TableCell>
                    <TableCell className={s.review_item_text} sx={{ ...cellStyles }}>
                      {review && (
                        <>
                          {review.review}
                          <span title={activeReviewId === review.id ? review.review : ""}></span>
                        </>
                      )}
                    </TableCell>
                    <TableCell sx={{ ...cellStyles, alignContent: "center" }}>
                      {Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <StarIcon key={index} fill={index < review.rating ? "black" : "white"} />
                        ))}
                    </TableCell>
                    <TableCell sx={{ ...cellStyles }}>{formatDate(review.createdAt)}</TableCell>
                    <TableCell sx={{ ...cellStyles }}>{review.status}</TableCell>
                    <TableCell
                      className={s.actionIcon}
                      sx={{
                        ...cellStyles,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                      }}
                    >
                      <a onClick={onChangeModal(review.id)}>
                        <ChangeIcon fill={"black"} />
                      </a>
                      <a onClick={() => handleRemoveNotice(review.id)}>
                        <DeleteIcon fill={"black"} width={53} height={53} />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {showModal && (
        <ModalSample toggleModal={toggleModal}>
          <ChangeStatus onSave={handleSaveChangeStatus} onClose={() => toggleModal()} />
        </ModalSample>
      )}
    </>
  )
}

export default ReviewsItems
