import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Parkbook</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/favorites">Favorites</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/user">User</Link>
            </li>
        </ul>
    )
}