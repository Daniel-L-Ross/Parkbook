import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Review.css"
import { ReviewCard } from "./ReviewCard"
import { ReviewContext } from "./ReviewProvider"

export const ReviewList = () => {
    const { reviews, getReviews } = useContext(ReviewContext)
    const [filteredReviews, setFiltered] = useState("")

    const { parkId } = useParams()

    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        debugger
        const currentParkReviews = reviews.filter(review => review.parkId === parseInt(parkId)) 
        const displayReviews = () => {
            if (currentParkReviews.length === 0) {
                return <h3>No Reviews</h3>
            } else if (currentParkReviews.length !== 0) {
                return currentParkReviews.map(review => <ReviewCard key={review.id} review={review} />)
            }
        }
        setFiltered(displayReviews())
    }, [reviews])


    return (
        <>
            <h2>Reviews List: </h2>
            <section className="reviews">
                {filteredReviews}
            </section>
            <Link to={`/reviews/create/${parkId}/0`}>
                <button>Add Review</button>
            </Link>
        </>
    )
}