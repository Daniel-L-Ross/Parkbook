import React, { useState, createContext } from "react"
import { userStorageKey, authApi } from "../auth/authSettings"

export const FavoriteContext = createContext()

export const FavoriteProvider = (props) => {

    const [userFavorites, setUserFavorites] = useState([])

    // get favorites by userId. Expand parks. 
    const getUserFavorites = () => {
            return fetch(`${authApi.localApiBaseUrl}/favorites/?userId=${sessionStorage.getItem(userStorageKey)}&_expand=park`)
            .then(res => res.json())
            .then((favorites) => {
            if (sessionStorage.getItem(userStorageKey)) {
                setUserFavorites(favorites)
            } else {
                setUserFavorites([])
            }
            })
    }

    const addFavorite = newFavorite => {
        return fetch(`${authApi.localApiBaseUrl}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
    }

    const deleteFavorite = favoriteId => {
        return fetch(`${authApi.localApiBaseUrl}/favorites/${favoriteId}`, {
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