import React from "react";
import { useSelector } from "react-redux";
import StarRatings from 'react-star-ratings';


const ListReview = ({ reviews }) => {
  const { user: authUser } = useSelector((state) => state.auth);

  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews?.map((review) => (
        <div key={review?._id} className="review-card my-4">
          <div className="star-ratings mb-2">
            <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numOfStar={5}
                starDimension="24px"
                starSpacing="1px">
            </StarRatings>
          </div>
          <p className="review_user">by {authUser?.name}</p>
          <p className="review_comment">{review?.comment || "No comment provided."}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReview;