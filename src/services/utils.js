import axios from "axios";
import {API_URL, SERVER_URL} from "../config";
import authAxios from "./authAxios";
import tokenService from "./tokenService";

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


export const getData = (endpoint) => {

    const instance = tokenService.getLocalAccessToken() ? authAxios : axios;
    return instance.get(SERVER_URL + endpoint)
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
}
export const getDataAuthentication = (endpoint) =>
    authAxios.get(SERVER_URL + endpoint)
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


export const postData = async (endpoint, data) => {
    authAxios.post(API_URL + endpoint, data)
        .then(({data}) => console.log(data) )
        .catch((error) => {throw error});

}

export const deleteElementFromArray =  (array, element) => {

    let newArray = [...array];
    let index = newArray.indexOf(element)
    newArray.splice(index, 1);

    return newArray;
}

export const getId = (id) => {

    return id === 'me'? tokenService.getUser().id : id;
}

export const closeModal = (modalName, setShowModals) => {
    setTimeout(() => {
        setShowModals((prevState) => ({...prevState, [modalName]: false}));
    }, 200)
}

export const  onClickShowModal = (modalName, setShowModals) => {
    setShowModals((prevState) => ({...prevState, [modalName]: true}));
}