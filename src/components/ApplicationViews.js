import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/FavoritesList"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"
import { ReviewForm } from "./reviews/ReviewForm"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <ParkProvider>
                    <Route exact path="/">
                        <ParkList />
                    </Route>



                    <Route path="/reviews/:parkId(\d+)">
                        <ReviewForm />
                    </Route>
                    <Route path="/reviews/create/:parkId(\d+)">
                        <ReviewForm />
                    </Route>
                    <Route path="/reviews/edit/:parkId(\d+)">
                        <ReviewForm />
                    </Route>
                </ParkProvider>

                <Route exact path="/favorites">
                    <FavoritesList />
                </Route>
            </FavoriteProvider>
        </>
    )
}