import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { FavoritesList } from "./favorites/FavoritesList"

// appication views
// navbar
// login
// register
// import "./Parkbook.css"

export const Parkbook = () => {
    return (
        <>
            <Route render={() => {
                if (sessionStorage.getItem(userStorageKey)) {
                    return (
                        <>
                            <h1>Welcome to parkbook. </h1>
                            <section >
                                <ParkProvider>
                                    <FavoriteProvider>
                                        {/* <ParkList /> */}
                                        <FavoritesList />
                                    </FavoriteProvider>
                                </ParkProvider>

                            </section>
                        </>
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
            </Route>
        </>
    )
}