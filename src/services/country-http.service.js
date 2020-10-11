import {http} from "../http";

export const getAllCountries = () => {
    return http.get("/countries");
};

export const getCountry = (id) => {
    return http.get(`/countries/${id}`);
};

export const createCountry = (data) => {
    return http.post("/countries", data);
};

export const updateCountry = (id, data) => {
    return http.put(`/countries/${id}`, data);
};

export const removeCountry = (id) => {
    return http.delete(`/countries/${id}`);
};

