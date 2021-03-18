import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {


    const { reviewId } = useParams()

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "New Review"}</h2>
        </form>
    )
}