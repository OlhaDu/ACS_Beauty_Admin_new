export interface ReviewsItemsProps {
    ratingFilter?: "positive" | "neutral" | "negative" | "all"
    statusFilter?: "pending" | "published" | "all"
    updateReviewsData: () => void
    searchTerm: string
  }