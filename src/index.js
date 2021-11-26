import debounce  from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';



const DEBOUNCE_DELAY = 300;

let name = "tan"

let x = fetchCountries(name);


