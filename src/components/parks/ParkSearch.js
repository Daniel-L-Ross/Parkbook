import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms, parks, getParks, searchTerms } = useContext(ParkContext)
    const [features, setFeatures] = useState([])

    
    useEffect(() => {
        getParks()
    }, [])
    
    
    useEffect(() => {
        if (parks.length !== 0){
            let featureArray = []
            const templatePark = parks[0]
            
            Object.keys(templatePark).map(feature => {
                
                if (templatePark[feature] === "Yes" || templatePark[feature] === "No") {
                    const prettyFeature = feature.replace(/_/g, ' ')
                    const featureObj = {
                        featureName: feature,
                        featureDisplay: prettyFeature
                    }
                    featureArray.push(featureObj)
                }
            }) 
            setFeatures(featureArray)
        }
    }, [parks])
    
    let searchArray = [...searchTerms]
    
    const handleAddFilter = (event) => {
        searchArray.push(event.target.value)
        setSearchTerms(searchArray)
    }

    const handleClearSearchTerms = () => {
        setSearchTerms([])
    }


    return (
        <>
            Park Search:
            <label htmlFor="features">Features:</label>
            <select onChange={handleAddFilter}>
                <option value="0">Select a feature</option>
                {features.map(feature => <option value={feature.featureName} key={feature.featureName}>{feature.featureDisplay}</option>)}
            </select>
            <div className="filters">
                <button onClick={handleClearSearchTerms}>Clear Filters</button>
                <h4>Filtering by: </h4>
                <ul className="filters__features">
                    {searchTerms.map(term => <li>{term.replace(/_/g, ' ')}</li>)}
                </ul>
            </div>
        </>
    )
}