import React from "react"
import { LoginProvider } from "./auth/LoginProvider"
import { NavBar } from "./nav/NavBar"
import { LoginRegister } from "./auth/LoginRegister"
import { ApplicationViews } from "./ApplicationViews"


export const Parkbook = () => {
    return (
        <>
            <LoginProvider>
                <NavBar />
                <div className="columns section">
                    <ApplicationViews />
                </div>
                <LoginRegister />
            </LoginProvider>
        </>
    )
}