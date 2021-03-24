import React, { useContext, useState } from "react"
import { authApi, userStorageKey } from "./authSettings"
import { LoginContext } from "./LoginProvider"
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const { setLoggedIn, setDisplayLogin } = useContext(LoginContext)

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    sessionStorage.setItem(userStorageKey, exists.id)
                    setLoggedIn(true)
                    setDisplayLogin(false)
                    setLoginUser({ email: "" })
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login" style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="h3 mb-3 font-weight-normal">Sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="label"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button is-link">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
            </section>
        </main>
    )
}

