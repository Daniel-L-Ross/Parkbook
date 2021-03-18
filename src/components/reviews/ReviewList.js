import React, { useContext, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Review.css"
import { ReviewCard } from "./ReviewCard"
import { ReviewContext } from "./ReviewProvider"

export const ReviewList = () => {
    const { reviews, getReviewsByPark } = useContext(ReviewContext)

    const { parkId } = useParams()

    useEffect(() => {
        getReviewsByPark(parkId)
    }, [])

    const renderReviews = () => {
        if (reviews.length === 0) {
            return <h3>No Reviews</h3>
        } else if (reviews.length !== 0) {
            return reviews.map(review => <ReviewCard key={review.id} review={review} />)
        }
    }


    return (
        <>
            <h2>Reviews List: </h2>
            <section className="reviews">
                {renderReviews()}
            </section>
            <Link to={`/reviews/create/${parkId}/0`}>
                <button>Add Review</button>
            </Link>
        </>
    )
}