import React, { createContext, useState } from "react"
import { authApi } from "../auth/authSettings"

export const UserContext = createContext()

export const UserProvider = props => {
    const [user, setUser] = useState({})

    const getUserById = userId => {
        return fetch(`${authApi.localApiBaseUrl}/users/${userId}`)
            .then(res => res.json())
            .then(setUser)
    }

    return (
        <UserContext.Provider value={{
            getUserById, user
        }}>
            {props.children}
        </UserContext.Provider>
    )
}