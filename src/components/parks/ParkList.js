import React, { useContext, useEffect } from "react"
import { ParkContext } from "./ParkProvider"
import { ParkCard } from "./Park"

export const ParkList = () => {
const { parks, getParks } = useContext(ParkContext)

useEffect(() => {
    getParks()
}, [])

    return (
        <>
        <div>Here is the parkList: </div>
        {
            parks.map(park => {
                return <ParkCard key={park.id} park={park} />
            })
        }
        </>
    )
}