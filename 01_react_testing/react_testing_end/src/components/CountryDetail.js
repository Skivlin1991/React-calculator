import React from 'react';
import './Country.css';

const CountryDetail = ({ country }) => {
    if (!country) {
        return null
    }

    return (
        <div id="selected-country">
            <h2> {country.name} </h2>
            <p> Population: {country.population} </p>
            <img className="lrg-flag" src={country.flag} alt={country.name} />
        </div>
    )
}

export default CountryDetail;