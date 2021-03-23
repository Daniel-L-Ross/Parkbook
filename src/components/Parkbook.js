import React from "react"
import { LoginProvider } from "./auth/LoginProvider"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"


export const Parkbook = () => {
    return (
        <>
            <LoginProvider>
                <NavBar />
                <div className="columns">
                    <ApplicationViews />
                </div>
            </LoginProvider>
        </>
    )
}