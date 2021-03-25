import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"

export const UserProfile = () => {
    const { getUserById, user } = useContext(UserContext)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    useEffect(() => {
        getUserById(currentUserId)
    }, [])

    return (
        <div className="column">
            <div className="card">
                <div className="card-header">

                    <h1 className="card-header-title is-centered">User Profile</h1>
                </div>
                <div className="card-content">

                    <p>Hi, {user.name}.</p>
                    <div>Your email: {user.email}</div>
                </div>
            </div>
        </div>
    )
}