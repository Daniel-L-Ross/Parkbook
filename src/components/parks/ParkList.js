import React, { useContext, useEffect } from "react"
import { ParkContext } from "./ParkProvider"
import { ParkCard } from "./ParkCard"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import "./Park.css"
import "../favorites/Favorites.css"


export const ParkList = () => {
const { parks, getParks } = useContext(ParkContext)
const { getUserFavorites } = useContext(FavoriteContext)

useEffect(() => {
    getParks()
    .then(getUserFavorites)
}, [])

    return (
        <div>
        <h2>Here is the parkList: </h2>
        <section className="parks">
        {
            parks.map(park => {
                return <ParkCard key={park.id} park={park} />
            })
        }
        </section>
        </div>
    )
}