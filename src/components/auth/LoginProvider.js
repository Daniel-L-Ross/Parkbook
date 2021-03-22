import React, { createContext, useState } from "react"

export const LoginContext = createContext()

export const LoginProvider = props => {
    // state variable used to disable user specific features if a user is not logged in
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <LoginContext.Provider value={{
            loggedIn, setLoggedIn
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}