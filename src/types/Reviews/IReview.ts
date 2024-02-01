export interface Review {
    id: string;
    firstName: string;
    lastName: string;
    productName: string;
    createdAt: string;
    review: string;
    status: string;
    rating: number;
  }
  export interface ContentProps {
    numberReviews: string | undefined;
    onPageChange: (currentReviews: Review[]) => void;
  }