import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { HiddenContext } from "../hidden/HiddenProvider"
import "./User.css"

export const UserProfile = () => {
    const { getUserById, user } = useContext(UserContext)
    const { getUserHidden, userHidden } = useContext(HiddenContext)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    useEffect(() => {
        getUserById(currentUserId)
            .then(getUserHidden)
    }, [])

    const handleRemoveHidden = () => {

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
                    <button className="button is-primary">Display</button>
                <div className="card parks">
                        {userHidden.map(hidden => {
                            return <div key={hidden.id} className=" park">
                                <h3>{hidden.park.park_name}</h3>
                                <button className="button">Restore Park</button>
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}