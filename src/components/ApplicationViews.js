import React from "react"
import { Route } from "react-router-dom"
import { FavoriteProvider } from "./favorites/FavoritesProvider"
import { FavoritesList } from "./favorites/FavoritesList"
import { ParkProvider } from "./parks/ParkProvider"
import { ParkList } from "./parks/ParkList"
import { ParkSearch } from "./parks/ParkSearch"
import { ReviewProvider } from "./reviews/ReviewProvider"
import { ReviewList } from "./reviews/ReviewList"
import { ReviewForm } from "./reviews/ReviewForm"


export const ApplicationViews = () => {
    return (
        <>
            <FavoriteProvider>
                <ParkProvider>
                    <Route exact path="/">
                        <ParkSearch />
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