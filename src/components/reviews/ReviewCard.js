import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"

export const ReviewCard = ({ review }) => {
    const { deleteReview, setDisplayReviewForm, setReviewId } = useContext(ReviewContext)
    const history = useHistory()


    const currentUserId = parseInt(sessionStorage.parkbook_user_id)
    let disabled = true

    if (currentUserId === review.userId) {
        disabled = false
    }

    const handleDeleteReview = () => {
        deleteReview(review.id)
    }
    
    const handleClickEdit = () => {
        setDisplayReviewForm(true)
        setReviewId(review.id)
        }

    return (
        <div className="review card">
            <div className="rating">Rating: {review.rating} / 5</div>
            <h3>Review:</h3>
            <p className="review-text">{review.review}</p>
            <p className="author">By: {review.user.name}</p>
            <div className="buttons">
                {disabled ? "" : <button className="button is-link" onClick={handleClickEdit}>Edit</button>}
                {disabled ? "" : <button onClick={handleDeleteReview} className="button is-warning">Delete</button>}
            </div>
        </div>
    )
}