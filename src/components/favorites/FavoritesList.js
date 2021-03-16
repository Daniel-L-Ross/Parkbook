import React, { useContext, useEffect, useState } from "react"
import { FavoriteContext } from "./FavoritesProvider"
import { ParkContext } from "../parks/ParkProvider"
import { FavoriteCard } from "./FavoriteCard"
import "./Favorites.css"

export const FavoritesList = () => {
    const { userFavorites, getUserFavorites } = useContext(FavoriteContext)


    useEffect(() => {
        getUserFavorites()
    }, [])

    return (
        <>
            <h2>Here is the favoritesList</h2>
            <section className="favorites">
                {
                    userFavorites.map(favorite => {
                        return <FavoriteCard key={favorite.id} favorite={favorite} />
                    })
                }
            </section>
        </>
    )
}