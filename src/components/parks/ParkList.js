import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import { ParkCard } from "./ParkCard"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import "./Park.css"
import "../favorites/Favorites.css"


export const ParkList = () => {
    const { parks, getParks, searchTerms, getParksByFeatures } = useContext(ParkContext)
    const { getUserFavorites } = useContext(FavoriteContext)
    const [filteredParks, setFiltered] = useState([])

    useEffect(() => {
        getUserFavorites()
            .then(getParks)
    }, [])

    useEffect(() => {
        let query
        if (searchTerms.length === 1) {
            query = `/?${searchTerms[0]}=Yes`
            getParksByFeatures(query)
            .then(setFiltered(parks))
        } else if (searchTerms.length > 1) {
            setFiltered(parks)
        } else {
            setFiltered(parks)
        }

    }, [parks, searchTerms])

    return (
        <div>
            <h2>Here is the parkList: </h2>
            <section className="parks">
                {
                    filteredParks.map(park => {
                        return <ParkCard key={park.id} park={park} />
                    })
                }
            </section>
        </div>
    )
}