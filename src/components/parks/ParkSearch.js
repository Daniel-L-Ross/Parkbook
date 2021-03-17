import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms, parks, getParks } = useContext(ParkContext)
    const [features, setFeatures] = useState([])

    let searchArray = []

    useEffect(() => {
        getParks()
    }, [])

    
    useEffect(() => {
        if (parks.length !== 0){
            let featureArray = []
            const templatePark = parks[0]
            
            Object.keys(templatePark).map(feature => {
                
                if (templatePark[feature] === "Yes" || templatePark[feature] === "No") {
                    console.log("featureValue:", templatePark[feature])
                    const prettyFeature = feature.replace(/_/g, ' ')
                    featureArray.push(prettyFeature)
                }
            }) 
            setFeatures(featureArray)
        }
    }, [parks])

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