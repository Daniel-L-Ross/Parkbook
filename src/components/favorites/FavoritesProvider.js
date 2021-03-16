import React, { useState, createContext } from "react"

export const FavoriteContext = createContext()

export const FavoriteProvider = (props) => {

    // handle state of all favorites
    const [allFavorites, setAllFavorites] = useState([])

    // handle state of currentUser favorites
    const [userFavorites, setUserFavorites] = useState([])

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)
    
    const getUserFavorites = () => {
        return fetch(`http://localhost:8088/favoites/?userId=${currentUserId}`)
            .then(res => res.json())
            .then(setUserFavorites)
    }

    const addFavorite = 
}