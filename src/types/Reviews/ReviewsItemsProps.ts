export interface ReviewsItemsProps {
    reviews: {
      id: string
      firstName: string
      lastName: string
      productName: string
      createdAt: string
      review: string
      status: string
      rating: number
    }[]
  
    ratingFilter?: "positive" | "neutral" | "negative"
    statusFilter?: "pending" | "published" | undefined
    updateReviewsData: () => void
    searchTerm: string
  }