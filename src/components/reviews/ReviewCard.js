import React, { useContext } from "react"
import { Link } from "react-router-dom"
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
            <div className="rating">Rating: {review.rating}</div>
            <h3>Review:</h3>
            <p className="review-text">{review.review}</p>
            <p className="author">By: {review.user.name}</p>
            <div className="buttons">
                {disabled ? "" : <Link to={`/parks/${review.parkId}/reviews/${review.id}/edit`}><button>Edit</button></Link>}
                {disabled ? "" : <button onClick={handleDeleteReview}>Delete</button>}
            </div>
        </div>
    )
}