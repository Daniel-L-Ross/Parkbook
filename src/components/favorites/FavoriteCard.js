import React, { useContext } from "react"
import { FavoriteContext } from "./FavoritesProvider"

export const FavoriteCard = ({park}) => {
    const { getUserFavorites, addFavorite } = useContext(FavoriteContext)

    const address = JSON.parse(park.mapped_location.human_address)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const handleClickRemoveFavorite = event => {

    }

    return(
        <div className="favorite">
            <h3 className="favorite__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
            <div className="favorite__buttons">
                <button onClick={handleClickRemoveFavorite}>Unfavorite</button>

            </div>
        </div>
    )
}