export interface Review {
    id: number;
    firstName: string;
    lastName: string;
    productName: string;
    createdAt: string;
    review: string;
    status: string;
    rating: number;
  //    productId: number;
  //  userId: number;
  }
  export interface ContentProps {
    numberReviews: number | undefined;
    onPageChange: (currentReviews: Review[]) => void;
  }