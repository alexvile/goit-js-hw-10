import './css/styles.css';
import countryCardTpl from './template/country.hbs';
import { fetchCountries } from './js/fetchCountries';
import debounce from "lodash.debounce"



const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfo: document.querySelector('.country-info'),
    search: document.getElementById('search-box')
}

refs.search.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange(e) {
    fetchCountries(e.target.value)
    .then(renderCountryCard)
    .catch(onFetchError)
}

function renderCountryCard(countries) {
    // console.log(countries);
    let markup = [];

        countries.map(country => {
            // console.log(country)
            console.log(countryCardTpl(country));
            markup.push(countryCardTpl(country));
        });
    // refs.countryInfo.innerHTML = markup;
    
    refs.countryInfo.innerHTML = markup.join('');
}

function onFetchError(error) {
    console.log('ERROR!!!!!!!!!!!!!');
}

