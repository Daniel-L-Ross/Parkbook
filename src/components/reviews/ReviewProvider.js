import React, { useState, createContext } from "react"

export const ReviewContext = createContext()

export const ReviewProvider = props => {
    const [reviews, setReviews] = useState([])

    const getReviewsByPark = parkId => {
        return fetch(`http://localhost:8088/reviews/?parkId=${parkId}&_expand=park&_expand=user`)
        .then(res => res.json()) 
        .then(setReviews)
    }

    return(
        <ReviewContext.Provider value={{
            reviews, getReviewsByPark
        }}>
            {props.children}
        </ReviewContext.Provider>
    )
}