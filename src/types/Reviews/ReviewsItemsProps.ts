export interface ReviewsItemsProps {
    ratingFilter?: "positive" | "neutral" | "negative"
    statusFilter?: "pending" | "published" | undefined
    updateReviewsData: () => void
    searchTerm: string
  }