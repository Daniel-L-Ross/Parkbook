import React, { useContext, useEffect, useState } from "react"
import { FavoriteContext } from "./FavoritesProvider"
import { ParkContext } from "../parks/ParkProvider"
import "./Favorites.css"

export const FavoritesList = () => {
    const [ favorites, setFavorites ] = useState([])

    const { parks, getParks } = useContext(ParkContext)
    const { userFavorites, getUserFavorites } = useContext(FavoriteContext)

    
    useEffect(() => {
        getParks()
        .then(getUserFavorites)
    }, [])

    useEffect(() => {
        const filteredFavorites = userFavorites.map(favorite => parks.filter(park => park.id === favorite.parkId)).flat()
        setFavorites(filteredFavorites)
    }, [userFavorites])

    return (
        <>
            <h2>Here is the favoritesList</h2>
            <section className="favorites">
                {
                    favorites.map(favorite => <div>{favorite.id}</div>)
                }
            </section>
        </>
    )
}