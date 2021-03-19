import React, { useContext, useState } from "react"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import { Link } from "react-router-dom"


export const ParkCard = ({ park }) => {
    const { userFavorites, getUserFavorites, addFavorite, deleteFavorite } = useContext(FavoriteContext)

    // use JSON.parse as nested address data was returned as a JSON object
    const address = JSON.parse(park.mapped_location.human_address)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const handleAddFavorite = event => {
        const newFavorite = {
            parkId: park.id,
            userId: currentUserId
        }
        addFavorite(newFavorite)
            .then(getUserFavorites)
    }

    const handleRemoveFavorite = event => {

        const favorite = userFavorites.filter(fav => fav.parkId === park.id && fav.userId === currentUserId)
        console.log(favorite[0])
        deleteFavorite(favorite[0].id)
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

    const [hidden, setHidden] = useState(true)

    const toggleDetail = () => {
        setHidden(!hidden)
    }

    return (
        <div className={favorited ? "favorite" : "park"}>
            <h3 className="park__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
            <div className={hidden ? "hidden" : "park__detail"}>
                <h4>Features: </h4>
                <ul className="features">
                    {parkFeatures().map(feature => <li key={feature} className="feature">{feature}</li>)}
                </ul>
                <h4>Notes:</h4>
                <p>{park.notes}</p>
            </div>
            <div className="buttons">
                <Link to={`/reviews/${park.id}`}>
                    {<button>Reviews</button>}
                </Link>
                {<button onClick={toggleDetail}>{hidden ? "Show Detail" : "Hide Detail"}</button>}
                {favorited ? <button onClick={handleRemoveFavorite}>Unfavorite</button> : <button onClick={handleAddFavorite}>Favorite</button>}
            </div>
        </div>
    )
}