import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"

export const ParkSearch = () => {
    const { setSearchTerms, parks, getParks, searchTerms } = useContext(ParkContext)
    const [features, setFeatures] = useState([])

    // get parks after initial render. setSearchterms to empty on component unmount
    useEffect(() => {
        getParks()
        return setSearchTerms([])
    }, [])


    useEffect(() => {
        if (parks.length !== 0) {
            let featureArray = []
            // get a park object so the function has access to a template object
            const templatePark = parks[0]

            // get the keys, then iterate over the function
            Object.keys(templatePark).map(feature => {

                // only grab the keys that have values of yes or no, which are "boolean" features
                if (templatePark[feature] === "Yes" || templatePark[feature] === "No") {
                    const prettyFeature = feature.replace(/_/g, ' ')

                    // create an object using the original key and the pretty key
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
        getParks()
    }

    const handleRemoveTerm = event => {
        const term = event.target.id
        const termIndex = searchArray.indexOf(term)

        if (termIndex > -1) {
            searchArray.splice(termIndex, 1)
        }

        setSearchTerms(searchArray)
    }

    return (
        <div className="column is-one-fifth search">
            <h2 className="subtitle">Search:</h2>
            <div className="select is-primary">
                <select onChange={handleAddFilter}>
                    <option value="0">Select a feature</option>
                    {/* iterate over the array of features. use the original key as the value for the search function to grab. Display the pretty feature */}
                    {features.map(feature => <option value={feature.featureName} key={feature.featureName}>{feature.featureDisplay}</option>)}
                </select>
            </div>
            <div className="filters">
                {searchTerms.length >= 1 ? <h4>Filtering by: </h4> : ""}
                <div className="field is-grouped is-grouped-multiline">
                    {searchTerms.map(term =>
                        <div className="control">
                            <div className="tags has-addons">
                                <span className="tag is-medium is-rounded is-primary" key={term}>
                                    {term.replace(/_/g, ' ')}
                                </span>
                                <button className="tag is-delete is-medium is-rounded" id={term} onClick={handleRemoveTerm}></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}