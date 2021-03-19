import React, { useContext } from "react"
import { ReviewContext } from "./ReviewProvider"





export const ReviewCard = ({ review }) => {
    const { deleteReview } = useContext(ReviewContext)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)
    let disabled = true

    if (currentUserId === review.userId) {
        disabled = false
    }

    const handleDeleteReview = () => {
        deleteReview(review.id)
    }

    return (
        <div className="review">
            {/* 
            review.rating
            review.review
            review.user.name - review.timestamp
            buttons
             */}
            <div className="rating">Rating: {review.rating}</div>
            <h3>Review:</h3>
            <p className="review-text">{review.review}</p>
            <p className="author">By: {review.user.name}</p>
            <div className="buttons">
                {disabled ? "" : <button onClick={handleDeleteReview}>Delete</button>}
            </div>
        </div>
    )
}