import React from "react"
import { LoginProvider } from "./auth/LoginProvider"
import { NavBar } from "./nav/NavBar"
import { LoginRegister } from "./auth/LoginRegister"
import { ApplicationViews } from "./ApplicationViews"
import { ReviewList } from "./reviews/ReviewList"
import "../css/parkbook.css"
import { ReviewProvider } from "./reviews/ReviewProvider"


export const Parkbook = () => {
    return (
        <>
            <LoginProvider>
                <ReviewProvider>
                <NavBar />
                <div className="columns section">
                    <ApplicationViews />
                </div>

                <LoginRegister />
                
                    <ReviewList />
                </ReviewProvider>
            </LoginProvider>
        </>
    )
}