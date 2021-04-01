import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { HiddenContext } from "../hidden/HiddenProvider"
import { ParkCard } from "../parks/ParkCard"

export const UserProfile = () => {
    const { getUserById, user } = useContext(UserContext)
    const { getUserHidden, userHidden } = useContext(HiddenContext)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    useEffect(() => {
        getUserById(currentUserId)
        .then(getUserHidden)
    }, [])

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
                <div>
                    <h4 className="title is-5">Hidden Parks List: </h4>
                    <ul>
                        {userHidden.map(hidden => {
                            return <li id={hidden.id}>{hidden.park.park_name}</li>
                        })}
                        </ul>
                </div>
            </div>
        </div>
    )
}