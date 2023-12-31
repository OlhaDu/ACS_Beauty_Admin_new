import React from 'react';

interface ReviewsItemsProps {
    reviews: { id: string;     
    name: string,
    authorName: string,
    data: number,
    status: string,
    rating: string,
}[];  
}

const ReviewsItems: React.FC<ReviewsItemsProps> =({reviews} ) => {

    return(
        <div>
        <h2> ReviewsItems </h2>
       
      
      {reviews.map((review) => (
        <div key={review.id}>
        <p>ID: {review.id}</p>
        <p>Name: {review.name}</p>
      <p>Author: {review.authorName}</p>
      <p>Data: {review.data}</p>
      <p>Status: {review.status}</p>
      <p>Rating: {review.rating}</p>
      
      </div>
      ))}
     </div>
    )
    
    }
    export default ReviewsItems;