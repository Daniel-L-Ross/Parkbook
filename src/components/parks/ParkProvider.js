import React, { useState, createContext } from "react"
import { authApi } from "../auth/authSettings"

export const ParkContext = createContext()

export const ParkProvider = props => {
    const [parks, setParks] = useState([])
    const [filteredParks, setFiltered] = useState([])

    /*
        As the common ancestor of parkSearch and parkList, ParkProvider is resposnible for searchterms.
        Terms set to empty array so multiple parameters can be evaluated simultaneously
    */
    const [searchTerms, setSearchTerms] = useState([])

    const getParks = () => {
        return fetch(`${authApi.localApiBaseUrl}/parks`)
            .then(res => res.json())
            .then(setParks)
    }

    const getParksByFeatures = query => {
        return fetch(`${authApi.localApiBaseUrl}/parks${query}`)
            .then(res => res.json())
            .then(setFiltered)
    }

    return (
        <ParkContext.Provider value={{
            getParks, parks, searchTerms, setSearchTerms, getParksByFeatures, filteredParks, setFiltered
        }}>
            {props.children}
        </ParkContext.Provider>
    )

}