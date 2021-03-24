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
import { LoginRegister } from "./auth/LoginRegister"
import { UserProfile } from "./users/UserProfile"
import { UserProvider } from "./users/UserProvider"


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
                        <Route exact path="/parks/:parkId(\d+)/reviews">
                            <ReviewList />
                        </Route>
                        <Route path="/parks/:parkId(\d+)/reviews/create">
                            <ReviewForm />
                        </Route>
                        <Route path="/parks/:parkId(\d+)/reviews/:reviewId(\d+)/edit">
                            <ReviewForm />
                        </Route>
                    </ReviewProvider>
                </ParkProvider>

                <Route exact path="/favorites">
                    <FavoritesList />
                </Route>
            </FavoriteProvider>

            <UserProvider>
                <Route path="/user">
                    <UserProfile />
                </Route>
            </UserProvider>

            <Route path="/login-or-register">
                <LoginRegister />
            </Route>
        </>
    )
}