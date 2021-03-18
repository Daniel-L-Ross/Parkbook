import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/FavoritesList"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"
import { ParkSearch } from "./parks/ParkSearch"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <ParkProvider>
                    <Route exact path="/">
                        <ParkSearch />
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