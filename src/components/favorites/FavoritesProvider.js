import React, { useState, createContext } from "react"

export const FavoriteContext = createContext()

export const FavoriteProvider = (props) => {

    // handle state of currentUser favorites
    const [userFavorites, setUserFavorites] = useState([])

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)
    
    const getUserFavorites = () => {
        return fetch(`http://localhost:8088/favorites/?userId=${currentUserId}`)
            .then(res => res.json())
            .then(setUserFavorites)
    }

    const addFavorite = newFavorite => {
        return fetch ("http://localhost:8088/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
    }

    return (
        <FavoriteContext.Provider value={{
            userFavorites, getUserFavorites, addFavorite
        }}>
            {props.children}
        </FavoriteContext.Provider>
    )
}