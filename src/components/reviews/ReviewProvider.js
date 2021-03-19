import React, { useState, createContext } from "react"

export const ReviewContext = createContext()

export const ReviewProvider = props => {
    const [reviews, setReviews] = useState([])

    const getReviews = () => {
        return fetch(`http://localhost:8088/reviews?_expand=park&_expand=user`)
            .then(res => res.json())
            .then(setReviews)
    }

    const addReview = reviewObj => {
        return fetch("http://localhost:8088/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        })
    }

    const deleteReview = reviewId => {
        return fetch(`http://localhost:8088/reviews/${reviewId}`, {
            method: "DELETE"
        })
        .then(getReviews)
    }

    return (
        <ReviewContext.Provider value={{
            reviews, getReviews, addReview, deleteReview
        }}>
            {props.children}
        </ReviewContext.Provider>
    )
}