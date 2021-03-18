import React, { useState, createContext } from "react"

export const ReviewContext = createContext()

export const ReviewProvider = props => {
    const [reviews, setReviews] = useState([])

    const getReviewsByPark = parkId => {
        return fetch(`http://localhost:8088/reviews/?parkId=${parkId}&_expand=park&_expand=user`)
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

    return(
        <ReviewContext.Provider value={{
            reviews, getReviewsByPark, addReview
        }}>
            {props.children}
        </ReviewContext.Provider>
    )
}