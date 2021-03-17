import React, { useState, createContext } from "react"

export const ParkContext = createContext()

export const ParkProvider = props => {
    const [parks, setParks] = useState([])
    /*
        use common ancestor of parkSearch and parkList to be resposnible for searchterms
        set to empty array so multiple parameters can be evaluated simultaneously
    */
    const [searchTerms, setSearchTerms] = useState([])

    const getParks = () => {
        return fetch("http://localhost:8088/parks")
            .then(res => res.json())
            .then(setParks)
    }

    const getParksByFeatures = query => {
        return fetch(`http://localhost:8088/parks${query}`)
            .then(res => res.json())
            // .then(setParks)
    }

    return (
        <ParkContext.Provider value={{
            getParks, parks, searchTerms, setSearchTerms, getParksByFeatures
        }}>
            {props.children}
        </ParkContext.Provider>
    )

}