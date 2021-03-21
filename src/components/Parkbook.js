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
            {/* <Route render={() => {
                if (sessionStorage.getItem(userStorageKey)) {
                    return (
                        <> */}
            <h1>Welcome to parkbook. </h1>
            <LoginProvider>
                <NavBar />
                <ApplicationViews />
            </LoginProvider>
            {/* </>
                    )
                } else {
                    return <Redirect to="/login" />;
                }
            }} />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route> */}
        </>
    )
}