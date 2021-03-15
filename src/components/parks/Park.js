import React from "react"

export const ParkCard = ({ park }) => {

console.log(typeof park.mapped_location.human_address)
    return (
        <section className="park">
            <h3 className="park__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {park.mapped_location.human_address}</div>
        </section>
    )
}