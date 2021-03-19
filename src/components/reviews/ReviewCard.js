import React from "react"




export const ReviewCard = ({ review }) => {
    const currentUserId = parseInt(sessionStorage.parkbook_user_id)
    let disabled = true

    if (currentUserId === review.userId) {
        disabled = false
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
                {disabled ? "" : <button>Delete</button>}
            </div>
        </div>
    )
}