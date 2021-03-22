import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { LoginProvider } from "./auth/LoginProvider"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"

export const Parkbook = () => {
    return (
        <>
            <h1>Welcome to parkbook. </h1>
            <LoginProvider>
                <NavBar />
                <ApplicationViews />
            </LoginProvider>
        </>
    )
}