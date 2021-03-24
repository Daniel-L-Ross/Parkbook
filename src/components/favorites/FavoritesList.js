import React, { useContext, useEffect } from "react"
import { FavoriteContext } from "./FavoritesProvider"
import { ParkCard } from "../parks/ParkCard"
import "./Favorites.css"

export const FavoritesList = () => {
    const { userFavorites, getUserFavorites } = useContext(FavoriteContext)

    useEffect(() => {
        getUserFavorites()
    }, [])

    return (
        // render all favorited parks for current user at the favorites page
        <section className="column">
            <h1 className="title is-2">Your favorites: </h1>
            <section className="favorites">
                {
                    userFavorites.map(favorite => {
                        return <ParkCard key={favorite.id} park={favorite.park} />
                    })
                }
            </section>
        </section>
    )
}