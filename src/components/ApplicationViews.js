import React from "react"
import { Route } from "react-router-dom"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { FavoritesList } from "./favorites/FavoritesList"
import { ParkProvider } from "./parks/ParkProvider"
import { ParkList } from "./parks/ParkList"
import { ParkSearch } from "./parks/ParkSearch"
import { UserProfile } from "./users/UserProfile"
import { UserProvider } from "./users/UserProvider"
import { HiddenProvider } from "./hidden/HiddenProvider"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <HiddenProvider>
                    <ParkProvider>
                        <Route exact path="/">
                            <ParkSearch />
                            <ParkList />
                        </Route>

                    </ParkProvider>
                </HiddenProvider>

                <Route exact path="/favorites">
                    <FavoritesList />
                </Route>
            </FavoriteProvider>

            <UserProvider>
                <HiddenProvider>
                    <Route path="/user">
                        <UserProfile />
                    </Route>
                </HiddenProvider>
            </UserProvider>
        </>
    )
}