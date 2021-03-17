import React, { useContext } from "react"
import { FavoriteContext } from "../favorites/FavoritesProvider"


export const ParkCard = ({ park }) => {
    const { userFavorites, getUserFavorites, addFavorite } = useContext(FavoriteContext)

    // use JSON.parse as nested address data was returned as a JSON object
    const address = JSON.parse(park.mapped_location.human_address)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const handleClickFavorite = event => {
        const newFavorite = {
            parkId: park.id,
            userId: currentUserId
        }
        addFavorite(newFavorite)
            .then(getUserFavorites)
    }

    let favorited = false

    const favoriteCheck = userFavorites.find(favorite => favorite.parkId === park.id)

    if (favoriteCheck !== undefined) {
        favorited = true
    }

    const parkFeatures = () => {
        let featureArray = []

        Object.keys(park).map(feature => {
            if (park[feature] === "Yes") {
                const prettyFeature = feature.replace(/_/g, ' ')
                featureArray.push(prettyFeature)
            }
        })

        return featureArray
    }

    return (
        <div className={favorited ? "favorite" : "park"}>
            <h3 className="park__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
            <div className="park__detail">
                <ul className="features">
                    {parkFeatures().map(feature => <li className="feature">{feature}</li>)}
                </ul>
                <p>Notes: {park.notes}</p>
            </div>
            <div className="park__buttons">
                {favorited ? "" : <button onClick={handleClickFavorite}>Favorite</button>}
            </div>
        </div>
    )
}