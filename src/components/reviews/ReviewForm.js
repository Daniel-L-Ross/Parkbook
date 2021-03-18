import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { ReviewContext } from "./ReviewProvider"
import "./Review.css"

export const ReviewForm = () => {


    const { reviewId } = useParams()

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "New Review"}</h2>
            <fieldset>
                <div className="form-group">
                    <p>Please rate the park from 1-5, with 1 being the lowest.</p>
                    <label htmlFor="1">1</label>
                    <input type="radio" id="1" name="rating" value="1"></input>
                    <label htmlFor="2">2</label>
                    <input type="radio" id="2" name="rating" value="2"></input>
                    <label htmlFor="3">3</label>
                    <input type="radio" id="3" name="rating" value="3"></input>
                    <label htmlFor="4">4</label>
                    <input type="radio" id="4" name="rating" value="4"></input>
                    <label htmlFor="5">5</label>
                    <input type="radio" id="5" name="rating" value="5"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label></label>
                    <textarea></textarea>
                </div>
            </fieldset>
        </form>
    )
}