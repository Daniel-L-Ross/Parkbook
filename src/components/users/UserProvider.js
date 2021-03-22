import React, { createContext } from "react"

export const UserContext = createContext()

export const UserProvider = props => {

    const getUserById = userId => {
        return fetch(`http://localhost:8088/users/${userId}`)
            .then(res => res.json())
    }

    return (
        <UserContext.Provider value={{
            getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}