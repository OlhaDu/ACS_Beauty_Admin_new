// import { Review } from "./IReview";

 export interface ReviewRow {
    id: number;
    firstName: string;
    author: string;
    lastName: string;
    productName: string;
    createdAt: "2024-02-08";
    review: string;
    status: string;
    rating: number;
    [key: string]: string | number;
}

