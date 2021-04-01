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
    }

    // render login and register togther for styling purposes
    return (
        <div className={displayLogin ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={handleCloseModal}></div>
            <div className="modal-content">
                <div className="box is-flex is-flex-direction-column">

                    <button className="is-medium is-delete tag is-align-self-flex-end" aria-label="close" onClick={handleCloseModal}></button>
                    <Login />
                    <div className="is-flex is-align-items-center is-justify-content-center m-6">
                        <span className="dividerLine"></span>
                        <h3 className="has-text-centered ml-2 mr-2">OR</h3>
                        <span className="dividerLine"></span>
                    </div>
                    <Register />
                </div>
            </div>
        </div>
    )
}