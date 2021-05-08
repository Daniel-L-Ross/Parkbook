import React, { useState, createContext } from "react"
import { userStorageKey, authApi } from "../auth/authSettings"


export const HiddenContext = createContext()

export const HiddenProvider = (props) => {
    const [userHidden, setUserHidden] = useState([])

    const getUserHidden = () => {
        return fetch(`${authApi.localApiBaseUrl}/hidden/?userId=${sessionStorage.getItem(userStorageKey)}&_expand=park`)
            .then(res => res.json())
            .then((hidden) => {
            if (sessionStorage.getItem(userStorageKey)) {
                setUserHidden(hidden)
            } else {
                setUserHidden([])
            }
            })
    }

    const addHidden = newHidden => {
        return fetch(`${authApi.localApiBaseUrl}/hidden`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHidden)
        })
    }

    const deleteHidden = hiddenId => {
        return fetch(`${authApi.localApiBaseUrl}/hidden/${hiddenId}`, {
            method: "DELETE"
        })
    }

    return (
        <HiddenContext.Provider value={{
            userHidden, getUserHidden, addHidden, deleteHidden
        }}>
            {props.children}
        </HiddenContext.Provider>
    )
}