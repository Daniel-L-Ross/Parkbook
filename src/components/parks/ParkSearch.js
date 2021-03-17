import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms, parks, getParks } = useContext(ParkContext)
    const [features, setFeatures] = useState([])

    let searchArray = []

    // useEffect(() => {
    //     getParks()
    //         .then(() =>{
    //             let featureArray = []
    //             debugger
    //             Object.values(parks[0]).map(feature => {
    //                 if (feature === "Yes" || "No") {
    //                     const prettyFeature = parks[0][feature].replace(/_/g, ' ')
    //                     featureArray.push(prettyFeature)
    //                 }
    //             }) 
    //             setFeatures(featureArray)
    //         })
    // }, [])

    return (
        <>
            Park Search:
            <label htmlFor="features">Features:</label>
            <select>
                <option value="0">Select a feature</option>
                {/* {features.map(feature => <option value={feature} key={feature}>{feature}</option>)} */}
            </select>
        </>
    )
}