import React from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import "./Login.css"


export const LoginRegister = () => {
    // render login and register togther for styling purposes
    return (
        <>
            <Login />
            <h2>OR</h2>
            <Register />
        </>
    )
}