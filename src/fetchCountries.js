import Notiflix from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
    if (!response.ok) {
      throw new Error(response.status,
                  Notiflix.Notify.failure('Oops, there is no country with that name'))    
    }
    return response.json();
  })
      .then(data => {
    
        if (data.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        return data;
      })
        .catch(error => {
  });;
}