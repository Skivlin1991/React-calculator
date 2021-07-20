import React from 'react';
import './Country.css';

const FavouriteListItem = ({ favouriteCountries }) => {
    if (favouriteCountries.length === 0) {
        return null;
    }
    const countryItems = favouriteCountries.map((country) => {
        return <li key={country.alpha3Code}>{country.name} <img className="small-flag" src={country.flag} alt={country.name} /></li>
    })

    return (
        <div id="favourite-countries">
            <h2>Favourite Countries</h2>
            <ul data-testid="favouite-list">
                {countryItems}
            </ul>
        </div>
    )
}

export default FavouriteListItem