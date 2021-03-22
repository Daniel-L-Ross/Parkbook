import React, { useState, createContext } from "react"
import { userStorageKey } from "../auth/authSettings"

export const FavoriteContext = createContext()

export const FavoriteProvider = (props) => {

    // handle state of currentUser favorites
    const [userFavorites, setUserFavorites] = useState([])

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const getUserFavorites = () => {
            return fetch(`http://localhost:8088/favorites/?userId=${currentUserId}&_expand=park`)
            .then(res => res.json())
            .then((userFavorites) => {
            if (sessionStorage.getItem(userStorageKey)) {
                setUserFavorites(userFavorites)
            } else {
                setUserFavorites([])
            }
            })
    }

    const addFavorite = newFavorite => {
        return fetch("http://localhost:8088/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
    }

    const deleteFavorite = favoriteId => {
        return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
            method: "DELETE"
        })
    }

    return (
        <FavoriteContext.Provider value={{
            userFavorites, getUserFavorites, addFavorite, deleteFavorite
        }}>
            {props.children}
        </FavoriteContext.Provider>
    )
}