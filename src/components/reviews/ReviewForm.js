import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {
    const { addReview, getReviewById, updateReview } = useContext(ReviewContext)
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()
    const { parkId, reviewId } = useParams()
    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const [review, setReview] = useState({
        parkId: parseInt(parkId),
        userId: currentUserId,
        rating: 0,
        review: "",
        timestamp: Date.now(),
        edited: false
    })

    const handleControlledInputChange = event => {
        const newReview = { ...review }

        let selectedValue = event.target.value
        newReview[event.target.id] = selectedValue

        setReview(newReview)
    }

    const handleSaveReview = event => {
        event.preventDefault()
        setIsLoading(true)

        if (parseInt(reviewId) !== 0) {
            updateReview({
                id: review.id,
                parkId: parseInt(parkId),
                userId: currentUserId,
                rating: review.rating,
                review: review.review,
                timestamp: Date.now(),
                edited: true
            })
                .then(() => history.push(`/reviews/${parkId}`))
        } else {
            addReview(review)
                .then(() => history.push(`/reviews/${parkId}`))
        }
    }

    const formTitle = () => {
        if (parseInt(reviewId) !== 0) {
            return "Edit Review"
        } else {
            return "New Review"
        }
    }

    const buttonText = () => {
        if (parseInt(reviewId) !== 0) {
            return "Confirm Changes"
        } else {
            return "Submit Review"
        }
    }

    useEffect(() => {
        if (parseInt(reviewId) !== 0) {
            getReviewById(reviewId)
                .then(oldReview => {
                    setReview(oldReview)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])


    const ratingOptions = () => {
        let options = []
        for (let index = 1; index <= 5; index++) {
            options.push(<option key={index} value={index}>{index}</option>)
        }
        return options
    }

    return (
        <form className="reviewForm" onSubmit={handleSaveReview}>
            <h2 className="reviewForm__title">{formTitle()}</h2>
            <fieldset>
                <div className="form-group">
                    <p>Please rate the park from 1-5, with 1 being the lowest.</p>

                    <select value={review.rating} id="rating" onChange={handleControlledInputChange} required >
                        <option value={0}>Rating...</option>
                        {ratingOptions()}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="text" id="review" placeholder="Add your review here" value={review.review} onChange={handleControlledInputChange} required ></textarea>
                </div>
            </fieldset>
            <button type="submit"
                disabled={isLoading}>
                {buttonText()}
            </button>
        </form>
    )
}