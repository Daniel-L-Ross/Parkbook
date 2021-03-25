import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {
    const { addReview, getReviewById, updateReview, setDisplayReviewForm, reviewPark  } = useContext(ReviewContext)
    const [isLoading, setIsLoading] = useState(true);

    const { reviewId } = useParams()
    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const [review, setReview] = useState({
        parkId: reviewPark.id,
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
        debugger
        event.preventDefault()
        setIsLoading(true)
        if (reviewId) {
            updateReview({
                id: review.id,
                parkId: reviewPark.id,
                userId: currentUserId,
                rating: review.rating,
                review: review.review,
                timestamp: Date.now(),
                edited: true
            })
            setDisplayReviewForm(false)

            } else {
            addReview(review)
            setDisplayReviewForm(false)
        }
    }

    const formTitle = () => {
        if (reviewId) {
            return "Edit Review"
        } else {
            return "New Review"
        }
    }

    const buttonText = () => {
        if (reviewId) {
            return "Confirm Changes"
        } else {
            return "Submit Review"
        }
    }

    useEffect(() => {
        if (reviewId) {
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

    const handleCancelReview = () => {
        setDisplayReviewForm(false)
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
            <button onClick={handleCancelReview}>Cancel</button>
        </form>
    )
}