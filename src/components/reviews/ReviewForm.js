import React, { useContext, useEffect, useRef, useState } from "react"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {
    const { addReview, getReviewById, updateReview, setDisplayReviewForm, displayReviewForm, reviewPark, reviewId, setReviewId } = useContext(ReviewContext)
    const [isLoading, setIsLoading] = useState(true);

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const scrollPoint = useRef()

    const [review, setReview] = useState({
        parkId: reviewPark.id,
        userId: currentUserId,
        rating: 0,
        review: "",
        timestamp: Date.now(),
        edited: false
    })

    useEffect(() =>{
        setReview({
            parkId: reviewPark.id,
            userId: currentUserId,
            rating: 0,
            review: "",
            timestamp: Date.now(),
            edited: false
        })
    }, [reviewPark])

    const handleControlledInputChange = event => {
        const newReview = { ...review }

        let selectedValue = event.target.value
        newReview[event.target.id] = selectedValue

        setReview(newReview)
    }

    const handleSaveReview = event => {
        event.preventDefault()
        setIsLoading(true)

        if (reviewId > 0) {
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
            setReview({
                parkId: reviewPark.id,
                userId: currentUserId,
                rating: 0,
                review: "",
                timestamp: Date.now(),
                edited: false
            })

        } else {

            addReview(review)
            setDisplayReviewForm(false)
            setReviewId(0)
            setReview({
                parkId: reviewPark.id,
                userId: currentUserId,
                rating: 0,
                review: "",
                timestamp: Date.now(),
                edited: false
            })
        }
    }

    const formTitle = () => {
        if (reviewId > 0) {
            return "Edit Review"
        } else {
            return "New Review"
        }
    }

    const buttonText = () => {
        if (reviewId > 0) {
            return "Confirm Changes"
        } else {
            return "Submit Review"
        }
    }

    useEffect(() => {
        if (reviewId > 0) {
            getReviewById(reviewId)
                .then(oldReview => {
                    setReview(oldReview)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [reviewId, displayReviewForm])


    const ratingOptions = () => {
        let options = []
        for (let index = 1; index <= 5; index++) {
            options.push(<option key={index} value={index}>{index}</option>)
        }
        return options
    }

    const handleCancelReview = () => {
        setDisplayReviewForm(false)
        setReviewId(0)
        setIsLoading(true)
        setReview({
            parkId: reviewPark.id,
            userId: currentUserId,
            rating: 0,
            review: "",
            timestamp: Date.now(),
            edited: false
        })
    }
    
    useEffect(() => {
        if (displayReviewForm){
            scrollPoint.current.focus()
        } else {
            handleCancelReview()
        }
    }, [displayReviewForm])

    return (
        <form className="reviewForm" onSubmit={handleSaveReview}>
            <h2 className="title is-4 has-text-centered">{formTitle()}</h2>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label">Please rate the park from 1-5, with 1 being the lowest.</label>

                    <select value={review.rating} id="rating" className="select" onChange={handleControlledInputChange} required >
                        <option value={0}>Rating...</option>
                        {ratingOptions()}
                    </select>
                </div>
            </fieldset>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label">Your Review</label>
                    <textarea type="text" id="review" placeholder="Add your review here" value={review.review} className="textarea" onChange={handleControlledInputChange} required ></textarea>
                </div>
            </fieldset>
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit"
                        disabled={isLoading}
                        className="button is-primary">
                        {buttonText()}
                    </button>
                    <button ref={scrollPoint} onClick={handleCancelReview} className="button is-warning">Cancel</button>
                </div>
            </div>
        </form>
    )
}