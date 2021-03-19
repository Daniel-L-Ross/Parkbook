import React, { useContext } from "react"
import { FavoriteContext } from "./FavoritesProvider"

export const FavoriteCard = ({favorite}) => {
    const { deleteFavorite } = useContext(FavoriteContext)
    const park = favorite.park

    const address = JSON.parse(park.mapped_location.human_address)

    const handleRemoveFavorite = event => {
        deleteFavorite(favorite.id)
    }

    return(
        <div className="favorite">
            <h3 className="favorite__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
            <div className="favorite__buttons">
                <button onClick={handleRemoveFavorite}>Unfavorite</button>
            </div>
        </div>
    )
}