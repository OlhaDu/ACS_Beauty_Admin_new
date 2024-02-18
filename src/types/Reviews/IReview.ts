export interface Review {
    id: number;
    firstName: string;
    lastName: string;
    productName: string;
    createdAt: "2024-02-08";
    review: string;
    status: "pending" | "published";
    rating: number;
     productId: number;
   userId: number;
  }
 