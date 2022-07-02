import './css/styles.css';
import countryCardTpl from './template/country.hbs';
import smallCountryCardTpl from './template/small-country.hbs';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce"

Notify.init({
    timeout: 1000,
});

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfo: document.querySelector('.country-info'),
    search: document.getElementById('search-box')
}

refs.search.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange(e) {
    if (e.target.value === '') {
        // console.log('input is empty');
        refs.countryInfo.innerHTML = '';
        return
    }

    fetchCountries(e.target.value.trim())
        
    .then(array => { 
        
        if (array.length > 10) {
            // console.log('more then 10');
            refs.countryInfo.innerHTML = '';
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
        else if ((array.length <= 10) && (array.length >= 2)) {
            renderCountriesCards(array);
        } else if (array.length === 1) {
            renderCountryCard(array);
        }
        else {
            refs.countryInfo.innerHTML = '';
            Notify.failure('Oops, there is no country with that name');
            // console.log('equal 0')
        }
    })
    // .then(renderCountriesCards)
    .catch(onFetchError)
}

function renderCountriesCards(countries) {
    // console.log(countries);
    let markup = [];

        countries.map(country => {
            // console.log(country)
            // console.log(countryCardTpl(country));
            markup.push(smallCountryCardTpl(country));
        });
    // refs.countryInfo.innerHTML = markup;
    
    refs.countryInfo.innerHTML = markup.join('');
}

function renderCountryCard(countries) {
   
    

        countries.map(country => {
            refs.countryInfo.innerHTML = countryCardTpl(country);
        });
    
   
    
}

function onFetchError(error) {
    refs.countryInfo.innerHTML = '';
    // console.log('CATCH ERROR!!!!!!!!!!!!!');
    console.log(error);
    // Notify.failure('Oops, there is no country with that name.');
    Notify.failure('Oops, something went wrong');
}

