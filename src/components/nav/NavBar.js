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
        <ul className="navbar">
            <img src={parkbook1} alt="logo"/>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Parkbook</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" onClick={handleFavoritesLink}>Favorites</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" onClick={handleUserLink}>User</Link>
            </li>
            <li className="navbar__item">
                {loggedIn ? <Link className="navbar__link" onClick={handleLogout}>Logout</Link> : <Link className="navbar__link" to="/login-or-register">Login</Link>}
            </li>
        </ul>
    )
}