import { Review } from "./IReview";

export interface IProps {
    review?: Review
    onClose: () => void
  }