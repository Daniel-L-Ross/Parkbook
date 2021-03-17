import React, { useContext } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms } = useContext(ParkContext)

    let searchArray = []

    return (
        <>
            Park Search:
            <label htmlFor="features">Features:</label>
            <select>
                <option value="0">Select a feature</option>
            </select>
        </>
    )
}