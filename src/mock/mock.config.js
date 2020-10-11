import data from '../assets/mock-data/countries.json'
import MockAdapter from "axios-mock-adapter";

let countriesList = data.countries;

export const isMockEnabled = () => {
    return process.env.REACT_APP_MOCK_ENABLED === 'true'
};

export const initializeAxiosMockAdapter = (instance) => {
    const mock = new MockAdapter(instance);
    mock.onGet("/countries").reply(() => getCountries());
    mock.onGet(/\/countries\/\d+/).reply(config => getCountry(config));
    mock.onPost("/countries").reply(config => addCountry(config));
    mock.onPut(/\/countries\/\d+/).reply(config => editCountry(config));
    mock.onDelete(/\/countries\/\d+/).reply(config => removeCountry(config))
};

export const getCountries = () => {
    return [200, countriesList]
};

export const getCountry = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const country = countriesList.find(c => c.id === id);
    return [200, country];
};

const extractIdPathParamFromUrl = (config) => {
    return config.url.split('/').pop();
};

export const addCountry = (config) => {
    const country = JSON.parse(config.data);
    countriesList.push(country);
    return [200, country];
};

export const editCountry = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const countryIndex = countriesList.findIndex(c => c.id === id);
    const country = JSON.parse(config.data);
    countriesList[countryIndex] = country;
    return [200, country];
};

export const removeCountry = (config) => {
    const id = extractIdPathParamFromUrl(config);
    countriesList = countriesList.filter(c => c.id !== id);
    return [204, null];
};

