import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { HiddenContext } from "../hidden/HiddenProvider"
import { ParkCard } from "../parks/ParkCard"

import "./User.css"

export const UserProfile = () => {
    const { getUserById, user } = useContext(UserContext)
    const { getUserHidden, userHidden } = useContext(HiddenContext)
    const [ parkDisplay, setParkDisplay ] = useState(false)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    useEffect(() => {
        getUserById(currentUserId)
            .then(getUserHidden)
    }, [])

    const toggleDisplay = () => {
        setParkDisplay(!parkDisplay)
    }

    return (
        <div className="column">
            <div className="box card">
                <div className="card-header">

                    <h1 className="card-header-title is-centered title is-2">User Profile</h1>
                </div>
                <div className="card-content">

                    <p>Hi, {user.name}.</p>
                    <div>Your email: {user.email}</div>
                </div>
                    <h4 className="title is-5">Hidden Parks List: </h4>
                    <button className="button is-primary" onClick={toggleDisplay}>{parkDisplay ? "Hide" : "Display"}</button>
                <div className={parkDisplay ? "parks" : "hidden"}>
                        {userHidden.map(hidden => <ParkCard key={hidden.id} park={hidden.park}/>)}
                </div>
            </div>
        </div>
    )
}