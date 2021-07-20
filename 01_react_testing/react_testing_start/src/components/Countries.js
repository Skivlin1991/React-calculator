import React, { useState, useEffect } from 'react';
import CountryDetail from './CountryDetail'
import FavouriteListItem from './FavouriteListItem'

const Countries = () => {

    const [countries, setCountries] = useState([]);
    const [selectedCountryAlpha3Code, setSelectedCountryAlpha3Code] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [favouriteCountries, setFavouriteCountries] = useState([]);

    useEffect(() => {
        getCountries()
    }, []);

    useEffect(() => {
        let country = countries.find(country => country.alpha3Code === selectedCountryAlpha3Code)
        setSelectedCountry(country);
    }, [countries, selectedCountryAlpha3Code])

    const getCountries = () => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(res => res.json())
            .then(data => setCountries(data))
    }

    const handleCountrySelected = (event) => {
        setSelectedCountryAlpha3Code(event.target.value)
    }

    const handleAddToFavourite = () => {
        if (!favouriteCountries.includes(selectedCountry)) {
            setFavouriteCountries(prevArray => [...prevArray, selectedCountry])
        }
    }

    const options = countries.map(country => {
        return <option value={country.alpha3Code} key={country.alpha3Code}>{country.name}</option>
    })

    return (

        <div>
            <h2>Country Container</h2>
            <select data-testid="country-selector" id="country-selector" onChange={handleCountrySelected} defaultValue="default">
                <option disabled value="default">Choose a country...</option>
                {options}
            </select>
            <CountryDetail country={selectedCountry} />
            <button data-testid="favourite-button" id="favourite-button" onClick={handleAddToFavourite}>Add to Favourites</button>
            <FavouriteListItem favouriteCountries={favouriteCountries} />
        </div>
    );

}

export default Countries;