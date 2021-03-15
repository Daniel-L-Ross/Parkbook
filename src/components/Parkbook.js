import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ParkList } from "./parks/ParkList"
import { ParkProvider } from "./parks/ParkProvider"

// appication views
// navbar
// login
// register
// import "./Parkbook.css"

export const Parkbook = () => {
    return (
        <>
            <h1>Welcome to parkbook. </h1>
            <section>
                <ParkProvider>
                    <ParkList />
                </ParkProvider>
            </section>
        </>
    )
}