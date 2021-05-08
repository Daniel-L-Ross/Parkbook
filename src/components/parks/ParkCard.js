import React, { useContext, useState } from "react"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import { userStorageKey } from "../auth/authSettings"
import { ReviewContext } from "../reviews/ReviewProvider"
import { HiddenContext } from "../hidden/HiddenProvider"


export const ParkCard = ({ park }) => {
    const { userFavorites, getUserFavorites, addFavorite, deleteFavorite } = useContext(FavoriteContext)
    const { addHidden, getUserHidden, userHidden, deleteHidden } = useContext(HiddenContext)
    const [hideWarning, setHideWarning] = useState(false)
    const { setReviewPark } = useContext(ReviewContext)

    // Nested address data is JSON object. Convert to javascript object.
    const address = JSON.parse(park.mapped_location.human_address)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    const handleAddFavorite = () => {
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

    const handleRemoveFavorite = () => {
        const favorite = userFavorites.filter(fav => fav.parkId === park.id && fav.userId === currentUserId)
        deleteFavorite(favorite[0].id)
            .then(getUserFavorites)
    }

    const handleHideParkClick = () => {
        if (sessionStorage.getItem(userStorageKey)) {
            setHideWarning(true)
        } else {
            window.alert("Log in to hide a park from search results")
        }
    }

    const handleAddHidden = () => {
        const newHidden = {
            parkId: park.id,
            userId: currentUserId
        }

        // if th park is favorited, delete that association 
        if (favorited) {
            handleRemoveFavorite()
        }

        addHidden(newHidden)
        .then(getUserHidden)
        setHideWarning(false)
    }

    const restoreHidden = () => {
        const hiddenParkCheck = userHidden.find(currentHidden => currentHidden.parkId === park.id)
        deleteHidden(hiddenParkCheck.id)
        .then(getUserHidden)
    }

    let favorited = false

    const favoriteCheck = userFavorites.find(favorite => favorite.parkId === park.id)

    if (favoriteCheck !== undefined) {
        favorited = true
    }

    let hiddenPark = false

    const hiddenParkCheck = userHidden.find(currentHidden => currentHidden.parkId === park.id)

    if (hiddenParkCheck !== undefined) {
        hiddenPark = true
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

        return featureArray.sort()
    }


    const handleReviewsLink = () => {
        setReviewPark(park)
    }

    // controls state variable to display or hide park details info
    const [hidden, setHidden] = useState(true)

    const toggleDetail = () => {
        setHidden(!hidden)
    }

    const dialogMessage = () => {
        if (hiddenPark) {
            return <div>Do you want to restore <b>{park.park_name}</b> to appear in searches?</div>
        } else {
            return <div>Do you want to hide <b>{park.park_name}</b> from all future searches? You can review your "hidden" list in your profile page.</div>
        }
    }

    const favoriteButton = () => {
        if (hiddenPark) {
            return ""
        } else {
            if (favorited) {
                return <button onClick={handleRemoveFavorite} className="button is-small is-link">Unfavorite</button> 
            } else {
                return <button onClick={handleAddFavorite} className="button is-small is-link">Favorite</button>
            }
        }
    }

    return (
        <div className={favorited ? "favorite card" : "park card"}>

            <dialog className="dialog" open={hideWarning}>
                {dialogMessage()}
                <div className="card-footer mt-6">
                    <button className="button is-primary card-footer-item" onClick={e => setHideWarning(false)}>Cancel</button>
                    <button className="button is-danger card-footer-item" onClick={hiddenPark ? restoreHidden : handleAddHidden}>Confirm</button>
                </div>
            </dialog>
            
            <div className="card-header">
                <h3 className="card-header-title">{park.park_name}</h3>
                {favoriteButton()}
                <button onClick={handleHideParkClick} className="button is-primary is-small card-footer-item">{hiddenPark ? "Restore" : "Hide"}</button>
            </div>
            <div className="card-content">

                <p>Park Size: {park.acres} acres</p>
                <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
                <div className="is-flex is-justify-content-center">
                </div>
                {/* toggle class to set display to hidden */}
                <div className={hidden ? "hidden" : "park__detail"}>
                    <h4>Features: </h4>
                    <div className="tags">
                        {parkFeatures().map(feature => <span key={feature} className="tag is-rounded is-secondary">{feature}</span>)}
                    </div>
                    <h4>Notes:</h4>
                    <p>{park.notes}</p>
                </div>
            </div>
            <div className="card-footer">
                <button onClick={handleReviewsLink} className="button is-small is-link card-footer-item">Reviews</button>
                {<button onClick={toggleDetail} className="button is-small is-primary card-footer-item">{hidden ? "Show Detail" : "Hide Detail"}</button>}
            </div>
        </div>
    )
}