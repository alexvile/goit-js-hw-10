const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = '?fields=name,capital,population,flags,languages';
// const FILTER ='?fields=name.official,capital,population,flags.svg,languages';
// const FILTER = '';


function fetchCountries(countryName) {
    return fetch(`${BASE_URL}/name/${countryName}${FILTER}`)
        .then(response => {
            return response.json();
        });
}

export { fetchCountries };

