import React from "react"

export const ParkCard = ({ park }) => {

console.log(typeof park.mapped_location.human_address)
const address = JSON.parse(park.mapped_location.human_address)
debugger
    return (
        <section className="park">
            <h3 className="park__name">{park.park_name}</h3>
            <p>Park Size: {park.acres} acres</p>
            <div>Address: {address.address} {address.city}, {address.state} {address.zip} </div>
        </section>
    )
}