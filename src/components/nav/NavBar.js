import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { LoginContext } from "../auth/LoginProvider"
import { userStorageKey } from "../auth/authSettings"
import parkbook1 from "../../images/parkbook1.png"
import "./NavBar.css"

export const NavBar = () => {
    const { loggedIn, setLoggedIn } = useContext(LoginContext)
    const history = useHistory()

    // NavBar renders on every page so it checks to see if user is logged in, then sets the state variable
    useEffect(() => {
        if (sessionStorage.getItem(userStorageKey)) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    const handleFavoritesLink = () => {
        if (loggedIn) {
            history.push("/favorites")
        } else {
            window.alert("Please login to see favorites")
        }
    }

    const handleUserLink = () => {
        if (loggedIn) {
            history.push("/user")
        } else {
            window.alert("Please login to see user profile")
        }
    }

    const handleLogout = () => {
        sessionStorage.clear()
        setLoggedIn(false)
        history.push("/")
    }

    return (
        <div className="navbar is-fixed-top">
            <Link to="/">
                <img src={parkbook1} alt="logo" className="navbar-brand" />
            </Link>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" onClick={handleFavoritesLink}>Favorites</Link>
                    <Link className="navbar-item" onClick={handleUserLink}>User</Link>
                </div>
            </div>

            <div className="navbar-end">
                <div className="buttons">
                    {loggedIn ? <Link className="button navbar-item" onClick={handleLogout}>Logout</Link> : <Link className="button navbar-item" to="/login-or-register">Login</Link>}
                </div>
            </div>
        </div>
    )
}