import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/FavoritesList"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <ParkProvider>
                    <Route exact path="/">
                        <ParkList />
                    </Route>
                </ParkProvider>

                <Route exact path="/favorites">
                    <FavoritesList />
                </Route>
            </FavoriteProvider>
        </>
    )
}