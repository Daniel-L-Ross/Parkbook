import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/FavoritesList"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"
import { ReviewForm } from "./reviews/ReviewForm"
import { ReviewList } from "./reviews/ReviewList"
import { ReviewProvider } from "./reviews/ReviewProvider"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <ParkProvider>
                    <Route exact path="/">
                        <ParkList />
                    </Route>


                    <ReviewProvider>
                        <Route path="/reviews/:parkId(\d+)">
                            <ReviewList />
                        </Route>
                        <Route path="/reviews/create/:parkId/:reviewId">
                            <ReviewForm />
                        </Route>
                        <Route path="/reviews/edit/:parkId(\d+)/reviewId(\d+)">
                            <ReviewForm />
                        </Route>
                    </ReviewProvider>

                </ParkProvider>

                <Route exact path="/favorites">
                    <FavoritesList />
                </Route>
            </FavoriteProvider>
        </>
    )
}