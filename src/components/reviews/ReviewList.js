import React, { useContext, useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { ReviewCard } from "./ReviewCard"
import { ReviewContext } from "./ReviewProvider"
import { ReviewForm } from "./ReviewForm"
import "./Review.css"


export const ReviewList = () => {
    const { reviews, getReviews, setReviews, displayReviews, setDisplayReviews, reviewPark, displayReviewForm, setDisplayReviewForm } = useContext(ReviewContext)
    const [filteredReviews, setFiltered] = useState("")

    useEffect(() => {
        getReviews()
    }, [reviewPark])

    // whenever reviews changes, get all the reviews for the current park. Handle empty review array. 
    useEffect(() => {
        const currentParkReviews = reviews.filter(review => review.parkId === parseInt(reviewPark?.id))
        const displayReviews = () => {
            if (currentParkReviews.length === 0) {
                return <h3>No Reviews yet...</h3>

            } else if (currentParkReviews.length !== 0) {
                return currentParkReviews.map(review => <ReviewCard key={review.id} review={review} />)
            }
        }
        setFiltered(displayReviews())
    }, [reviews])

    const handleAddReview = () => {
        if (sessionStorage.getItem(userStorageKey)) {
            setDisplayReviewForm(true)
        } else {
            window.alert("Please log in to add a review.")
        }
    }

    const handleCloseReviewModal = () => {
        setDisplayReviews(false)
        setDisplayReviewForm(false)
    }


    return (
        <div className={displayReviews ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={handleCloseReviewModal}></div>
            <div className="modal-content">
                <div className="box">
                    <h2 className="title  is-2 has-text-centered">Reviews for:</h2>
                    <h2 className="title is-1 has-text-centered">{reviewPark?.park_name}</h2>

                    <section className="reviews">
                        {filteredReviews}
                    </section>
                    <button onClick={handleAddReview} className={displayReviewForm ? "hidden" : "button is-primary is-medium "}>Add Review</button>
                    <div className={displayReviewForm ? "" : "hidden"}>
                        <ReviewForm />
                    </div>

                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={handleCloseReviewModal}></button>
        </div>
    )
}