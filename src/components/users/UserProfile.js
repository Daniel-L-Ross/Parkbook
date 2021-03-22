import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"

export const UserProfile = () => {

    const { getUserById, user } = useContext(UserContext)

    const currentUserId = parseInt(sessionStorage.parkbook_user_id)

    useEffect(() => {
        debugger
        getUserById(currentUserId)
    }, [])


    
    return (
        <>
            <h1>User Profile</h1>
            <p>Hi, {user ? user.name : ""}.</p>
            <div>Your email: {user ? user.email: ""}</div>
        </>
    )
}