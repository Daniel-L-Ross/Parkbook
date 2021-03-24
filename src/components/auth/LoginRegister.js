import React, { useContext } from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import { LoginContext } from "./LoginProvider"
import { userStorageKey } from "./authSettings"
import "./Login.css"


export const LoginRegister = () => {

    const { displayLogin, setDisplayLogin } = useContext(LoginContext)

    const handleCloseModal = () => {
        setDisplayLogin(false)
    }

    if (sessionStorage.getItem(userStorageKey)) {
        setDisplayLogin(false)
        console.log("working")
    }

    // render login and register togther for styling purposes
    return (
        <div className={displayLogin ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={handleCloseModal}></div>
            <div className="modal-content">
                <div className="box is-flex is-flex-direction-column">

                    <button className="is-medium is-delete tag is-align-self-flex-end" aria-label="close" onClick={handleCloseModal}></button>
                    <Login />
                    <h2>OR</h2>
                    <Register />
                </div>
            </div>
        </div>
    )
}