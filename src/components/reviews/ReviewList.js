import React, { useContext, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Review.css"
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
            return reviews.map(review => review.review)
        }
    }


    return (
        <>
            <h2>Reviews List: </h2>
            {renderReviews()}
            <Link to={`/reviews/create/${parkId}`}>
                <button>Add Review</button>
            </Link>
        </>
    )
}