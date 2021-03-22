import React, { useContext, useState } from "react"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import { userStorageKey } from "../auth/authSettings"
import { useHistory } from "react-router"


export const ParkCard = ({ park }) => {
    const { userFavorites, getUserFavorites, addFavorite, deleteFavorite } = useContext(FavoriteContext)
    const history = useHistory()
    // Nested address data was returned as a JSON object
    const address = JSON.parse(park.mapped_location.human_address)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const handleAddFavorite = event => {
        if (sessionStorage.getItem(userStorageKey)) {
            const newFavorite = {
                parkId: park.id,
                userId: currentUserId
            }
            addFavorite(newFavorite)
                .then(getUserFavorites)
        } else {
            window.alert("Log in to add a park to favorites")
        }
    }

    const handleRemoveFavorite = event => {
        const favorite = userFavorites.filter(fav => fav.parkId === park.id && fav.userId === currentUserId)
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

        // iterate over all the keys
        Object.keys(park).map(feature => {
            // get all keys that hold a value of "Yes"
            if (park[feature] === "Yes") {
                // remove underscores
                const prettyFeature = feature.replace(/_/g, ' ')
                // add it to an array for rendering
                featureArray.push(prettyFeature)
            }
        })

        return featureArray
    }


    const handleReviewsLink = () => {
        history.push(`/parks/${park.id}/reviews`)
    }

    // controls state variable to display or hide park details info
    const [hidden, setHidden] = useState(true)

    const toggleDetail = () => {
        setHidden(!hidden)
    }

    return (
        <div className={favorited ? "favorite card" : "park card"}>
            <div className="card-header">
                <h3 className="card-header-title">{park.park_name}</h3>
            </div>
            <div className="card-content">

                <p>Park Size: {park.acres} acres</p>
                <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>

                {/* toggle class to set display to hidden */}
                <div className={hidden ? "hidden" : "park__detail"}>
                    <h4>Features: </h4>
                    <ul className="features">
                        {parkFeatures().map(feature => <li key={feature} className="feature">{feature}</li>)}
                    </ul>
                    <h4>Notes:</h4>
                    <p>{park.notes}</p>
                </div>
            </div>
            <div className="card-footer">
                {<button onClick={handleReviewsLink} className="button is-small is-primary card-footer-item">Reviews</button>}
                {<button onClick={toggleDetail} className="button is-small is-primary card-footer-item">{hidden ? "Show Detail" : "Hide Detail"}</button>}
                {favorited ? <button onClick={handleRemoveFavorite} className="button is-small is-primary card-footer-item">Unfavorite</button> : <button onClick={handleAddFavorite} className="button is-small is-primary card-footer-item">Favorite</button>}
            </div>
        </div>
    )
}