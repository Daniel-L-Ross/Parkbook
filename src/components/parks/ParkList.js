import React, { useContext, useEffect } from "react"
import { ParkContext } from "./ParkProvider"
import { ParkCard } from "./ParkCard"
import "./Park.css"

export const ParkList = () => {
const { parks, getParks } = useContext(ParkContext)

useEffect(() => {
    getParks()
}, [])

    return (
        <>
        <h2>Here is the parkList: </h2>
        <section className="parks">
        {
            parks.map(park => {
                return <ParkCard key={park.id} park={park} />
            })
        }
        </section>
        </>
    )
}