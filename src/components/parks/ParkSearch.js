import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms, parks, getParks } = useContext(ParkContext)
    const [features, setFeatures] = useState([])

    let searchArray = []

    useEffect(() => {
        const parkFeatures = () => {
            let featureArray = []
            
            Object.keys(parks[0]).map(feature => {
                if (parks[0][feature] === "Yes" || "No") {
                    const prettyFeature = feature.replace(/_/g, ' ')
                    featureArray.push(prettyFeature)
                }
            })
            return featureArray
        }
        getParks()
        .then(setFeatures(parkFeatures))
    }, [])
        
    return (
        <>
            Park Search:
            <label htmlFor="features">Features:</label>
            <select>
                <option value="0">Select a feature</option>
                {features.map(feature => <option value={feature} key={feature}>{feature}</option>)}
            </select>
        </>
    )
}