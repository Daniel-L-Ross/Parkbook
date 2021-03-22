import React from "react"
import { LoginProvider } from "./auth/LoginProvider"
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