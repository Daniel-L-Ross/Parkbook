import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {

    const { parkId, reviewId } = useParams()
    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const [review, setReview] = useState({
        parkId: parkId,
        userId: currentUserId,
        rating: 0,
        review: "",
        timestamp: 0,
        edited: false
    })

    const handleControlledInputChange = event => {
        const newReview = { ...review }
        if (event.target.type === "radio") {
            let selectedValue = event.target.value
            newReview[event.target.name] = selectedValue
        } else if (event.target.type !== "radio") {
            let selectedValue = event.target.value
            newReview[event.target.id] = selectedValue
        }
        setReview(newReview)
    }

    const handleSaveReview = event => {
        event.preventDefault()
        console.log(parkId, reviewId)
    }

    return (
        <form className="reviewForm" onSubmit={handleSaveReview}>
            <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "New Review"}</h2>
            <fieldset>
                <div className="form-group">
                    <p>Please rate the park from 1-5, with 1 being the lowest.</p>
                    <label htmlFor="1">1</label>
                    <input type="radio" id="1" name="rating" value="1" onChange={handleControlledInputChange} required />
                    <label htmlFor="2">2</label>
                    <input type="radio" id="2" name="rating" value="2" onChange={handleControlledInputChange} />
                    <label htmlFor="3">3</label>
                    <input type="radio" id="3" name="rating" value="3" onChange={handleControlledInputChange} />
                    <label htmlFor="4">4</label>
                    <input type="radio" id="4" name="rating" value="4" onChange={handleControlledInputChange} />
                    <label htmlFor="5">5</label>
                    <input type="radio" id="5" name="rating" value="5" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label></label>
                    <textarea type="text" id="review" value={review.review} onChange={handleControlledInputChange} required ></textarea>
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