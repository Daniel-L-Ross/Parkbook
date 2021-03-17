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
        let fetchUrl = "http://localhost:8088/parks"
        if (searchTerms.length !== 0) {
            for (const term of searchTerms) {
                fetchUrl+= ``
            }
        } else {
            return fetch("http://localhost:8088/parks")
            .then(res => res.json())
            .then(setParks)
        }
    }

    return (
        <ParkContext.Provider value ={{
            getParks, parks, searchTerms, setSearchTerms
        }}>
            {props.children}
        </ParkContext.Provider>
    )

}