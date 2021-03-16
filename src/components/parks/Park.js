import React from "react"

export const ParkCard = ({ park }) => {

    // use JSON.parse as nested address data was returned as a JSON object
const address = JSON.parse(park.mapped_location.human_address)
debugger
    return (
        <div className="park">
            <h3 className="park__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
        </div>
    )
}