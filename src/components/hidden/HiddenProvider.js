import React, { useState, createContext } from "react"
import { userStorageKey } from "../auth/authSettings"

export const HiddenContext = createContext()

export const HiddenProvider = (props) => {
    const [userHidden, setUserHidden] = useState([])

    const getUserHidden = () => {
        return fetch(`http://localhost:8088/hidden/?userId=${sessionStorage.getItem(userStorageKey)}&_expand=park`)
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
        return fetch("http://localhost:8088/hidden", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHidden)
        })
    }

    const deletehidden = hiddenId => {
        return fetch(`http://localhost:8088/favorites/${hiddenId}`, {
            method: "DELETE"
        })
    }

    return (
        <HiddenContext.Provider value={{
            userHidden, getUserHidden, addHidden, deletehidden
        }}>
            {props.children}
        </HiddenContext.Provider>
    )
}