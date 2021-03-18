import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {

    const { ParkId, reviewId } = useParams()
    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const [review, setReview] = useState({
        parkId: ParkId,
        userId: currentUserId,
        rating: 0,
        review: "",
        timestamp: 0,
        edited: false
    })


    const handleSaveReview = event => {
        event.preventDefault()
        console.log(review)
    }

    return (
        <form className="reviewForm" onSubmit={handleSaveReview}>
            <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "New Review"}</h2>
            <fieldset>
                <div className="form-group">
                    <p>Please rate the park from 1-5, with 1 being the lowest.</p>
                    <label htmlFor="1">1</label>
                    <input type="radio" id="1" name="rating" value="1" required />
                    <label htmlFor="2">2</label>
                    <input type="radio" id="2" name="rating" value="2" />
                    <label htmlFor="3">3</label>
                    <input type="radio" id="3" name="rating" value="3" />
                    <label htmlFor="4">4</label>
                    <input type="radio" id="4" name="rating" value="4" />
                    <label htmlFor="5">5</label>
                    <input type="radio" id="5" name="rating" value="5" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label></label>
                    <textarea type="text" id="reviewText" value={review.review} required ></textarea>
                </div>
            </fieldset>
            <button type="submit"
            // disabled={isLoading}>
            >
                {reviewId ? "Update Review" : "Submit Review"}
            </button>
        </form>
    )
}