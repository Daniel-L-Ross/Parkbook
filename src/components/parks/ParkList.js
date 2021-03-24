import React, { useContext, useEffect } from "react"
import { ParkContext } from "./ParkProvider"
import { ParkCard } from "./ParkCard"
import { FavoriteContext } from "../favorites/FavoritesProvider"
import { LoginContext } from "../auth/LoginProvider"
import "./Park.css"
import "../favorites/Favorites.css"


export const ParkList = () => {
    const { parks, getParks, searchTerms, getParksByFeatures, filteredParks, setFiltered } = useContext(ParkContext)
    const { getUserFavorites } = useContext(FavoriteContext)

    const { loggedIn } = useContext(LoginContext)

    // get parks whenever loggedIn state is changed
    useEffect(() => {
        getUserFavorites()
            .then(getParks)
    }, [loggedIn])

    // if parks or searchTerms change, this runs
    useEffect(() => {
        // define variable for dynamic api call
        let query = `/?${searchTerms[0]}=Yes`
        // if there is 1 search term, do this
        if (searchTerms.length === 1) {
            getParksByFeatures(query)
            .then(setFiltered(parks))

            // if there are multiple searchTerms, do this
        } else if (searchTerms.length > 1) {
            for (let index = 1; index < searchTerms.length; index++) {
                const feature = searchTerms[index];
                query += `&${feature}=Yes`
            }
            getParksByFeatures(query)
            .then(setFiltered(parks))

            // if there are no searchTerms, do this
        } else {
            setFiltered(parks)
        }

    }, [parks, searchTerms])

    return (
        <div className="column">
            {searchTerms.length >= 1 ? <h1 className="title has-text-centered">Search Results</h1> : <h1 className="title has-text-centered">Davidson County Parks</h1>}
            <section className="parks">
                {
                    filteredParks.map(park => {
                        return <ParkCard key={park.id} park={park} />
                    })
                }
            </section>
        </div>
    )
}