import React, { useState, createContext } from "react"

export const ParkContext = createContext()

export const ParkProvider = props => {
    const [parks, setParks] = useState([])

    const getParks = () => {
        return fetch("http://localhost:8088/parks")
            .then(res => res.json())
            .then(setParks)
    }

    return (
        <ParkContext.Provider value ={{
            parks
        }}>
            {props.children}
        </ParkContext.Provider>
    )

}