import axios from "axios";
import {SERVER_URL} from "../config";

export const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
}


export const defaultFiltersSettings = {
    "order": 'newest',
    "developers": null,
    "principles": true,
    "technologies": [],
    "address": null,
    "workTypes": []
}

export const generateQueryParameters = (filtersSettings) => {

    let url = '';

    if (filtersSettings.order)
        url += `&order=${filtersSettings.order}`;
    if (filtersSettings.address)
        url += `&address.id=${filtersSettings.address}`;
    if (Array.isArray(filtersSettings.technologies) && filtersSettings.technologies.length > 0)
        url += `&technologies=${filtersSettings.technologies.join(',')}`;
    if (Array.isArray(filtersSettings.workTypes) && filtersSettings.workTypes.length > 0)
        url += `&workTypes=${filtersSettings.workTypes.join(',')}`;

    return url;
}

export const searchArray = (search, array, filterProperty) => {
    return array.filter((element) => {
        let regex = new RegExp('^' + search, 'i');
        return !!element[filterProperty].match(regex);
    }, search)
}

export const isInArray = (element, array) => {
    return array.indexOf(element) > -1;
}


export const getData = (endpoint) =>
    axios.get(SERVER_URL + endpoint)
        .then(({data}) => data)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    return undefined
                }
            } else {
                throw error
            }
        })