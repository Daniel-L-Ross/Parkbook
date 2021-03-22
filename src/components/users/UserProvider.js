import React, { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = props => {
    const [user, setUser] = useState({})

    const getUserById = userId => {
        return fetch(`http://localhost:8088/users/${userId}`)
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