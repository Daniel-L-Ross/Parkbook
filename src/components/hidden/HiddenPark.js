import React, { useContext, useState } from "react"
import { HiddenContext } from "./HiddenProvider"
import { ReviewContext } from "../reviews/ReviewProvider"

export const HiddenPark = ({ hidden }) => {

    const park = hidden.park

    const [hideWarning, setHideWarning] = useState(false)
    const [displayList, setDisplayList] = useState(true)
    const { setReviewPark } = useContext(ReviewContext)
    const { deleteHidden, getUserHidden } = useContext(HiddenContext)

    const address = JSON.parse(park.mapped_location.human_address)


    const handleRestoreHiddenClick = () => {
        setHideWarning(true)
    }

    const restoreHidden = () => {
        deleteHidden(hidden.id)
        .then(getUserHidden)
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

    const toggleDetail = () => {
        setDisplayList(!displayList)
    }

    return (
        <div className="park card">

            <dialog className="dialog" open={hideWarning}>
                <div>Do you want to restore <b>{park.park_name}</b> to appear in searches?</div>
                <div className="card-footer mt-6">
                    <button className="button is-primary card-footer-item" onClick={e => setHideWarning(false)}>Cancel</button>
                    <button className="button is-danger card-footer-item" onClick={restoreHidden}>Confirm</button>
                </div>
            </dialog>
            
            <div className="card-header">
                <h3 className="card-header-title">{park.park_name}</h3>
                <button onClick={handleRestoreHiddenClick} className="button is-primary is-small card-footer-item">Restore</button>
            </div>
            <div className="card-content">

                <p>Park Size: {park.acres} acres</p>
                <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
                <div className="is-flex is-justify-content-center">
                </div>
                {/* toggle class to set display to hidden */}
                <div className={displayList ? "hidden" : "park__detail"}>
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
                {<button onClick={toggleDetail} className="button is-small is-primary card-footer-item">{displayList ? "Show Detail" : "Hide Detail"}</button>}
            </div>
        </div>
    )
}