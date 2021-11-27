import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
let name = "";

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {

    clearCountriesContent();
    name = e.target.value.trim();

    if (name === '') { return;}
 
    fetchCountries(name).then(data => {
        if (data === undefined) {
            return;
        }

        if (data.length === 1) {
            refs.countryInfo.innerHTML = countryInfoMarkup(data);
        }
        if (data.length >= 2 && data.length <= 10) {
            refs.countryList.innerHTML = countryListMarkup(data);
        }
       
    });
}

function clearCountriesContent() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function countryInfoMarkup(data) {
    return data
        .map((datai) => {
            return  `
    <div class="country-name__item" >
    <img
      class="flag__image"
      src="${datai.flags.svg}"
      alt="flag country"
      width = "50"  
    />
    <h2>${datai.name.official}</h2>
    </div>
    <p><b>Capital: ${datai.capital}<b><p>
    <p><b>Population: ${datai.population}<b><p>
    <p><b>Languages: ${Object.values(datai.languages)}<b><p>
`;
})
.join("");    
}

function countryListMarkup(data) {
    return data
        .map((datai) => {
            return  `
    <div class="country-list__item" >
    <img
      class="flag__image"
      src="${datai.flags.svg}"
      alt="flag country"
      width = "50"   
    />
    <h2>${datai.name.official}</h2>
    </div>
`;
})
.join("");    
}


