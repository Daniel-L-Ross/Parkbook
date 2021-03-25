import React, { useState, createContext } from "react"

export const ReviewContext = createContext()

export const ReviewProvider = props => {
    const [reviews, setReviews] = useState([])
    const [ reviewId, setReviewId ] = useState(0)
    const [ displayReviews, setDisplayReviews ] = useState(false)
    const [ reviewPark, setReviewPark ] = useState({})
    const [ displayReviewForm, setDisplayReviewForm ] = useState(false)


    const getReviews = () => {
        return fetch(`http://localhost:8088/reviews/?_expand=user`)
            .then(res => res.json())
            .then(setReviews)
    }

    const getReviewById = reviewId => {
        return fetch(`http://localhost:8088/reviews/${reviewId}`)
            .then(res => res.json())
    }

    const addReview = reviewObj => {
        return fetch("http://localhost:8088/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        })
        .then(getReviews)
    }

    const updateReview = reviewObj => {
        return fetch(`http://localhost:8088/reviews/${reviewObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        })
        .then(getReviews)
    }

    const deleteReview = reviewId => {
        return fetch(`http://localhost:8088/reviews/${reviewId}`, {
            method: "DELETE"
        })
        .then(getReviews)
    }

    return (
        <ReviewContext.Provider value={{
            reviews, getReviews, setReviews, addReview, deleteReview, getReviewById, updateReview, reviewId, setReviewId, 
            displayReviews, setDisplayReviews, reviewPark, setReviewPark, displayReviewForm, setDisplayReviewForm 
        }}>
            {props.children}
        </ReviewContext.Provider>
    )
}