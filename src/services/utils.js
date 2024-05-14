import axios from 'axios';
import { API_URL, SERVER_URL } from '../config';
import authAxios from './authAxios';
import tokenService from './tokenService';
import { ROLE_DEVELOPER, ROLE_ME, ROLE_PRINCIPLE } from '../helpers/Roles';

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const defaultFiltersSettings = {
    order: 'NEWEST',
    developers: null,
    principles: true,
    technologies: [],
    address: null,
    workTypes: [],
    size: 10
};

export const generateQueryParameters = (filtersSettings) => {
    let url = '';


    if (filtersSettings.order) url += `&sort=${filtersSettings.order}`;
    if (filtersSettings.address) url += `&address.city=${filtersSettings.address}`;
    if (Array.isArray(filtersSettings.technologies) && filtersSettings.technologies.length > 0)
        url += `&technologies=${filtersSettings.technologies.join(',')}`;
    if (Array.isArray(filtersSettings.workTypes) && filtersSettings.workTypes.length > 0)
        url += `&workTypes=${filtersSettings.workTypes.join(',')}`;


    url += `&size=${filtersSettings.size}`

    return url;
};

export const searchArray = (search, array, filterProperty) => {
    return array.filter((element) => {
        let regex = new RegExp('^' + search, 'i');
        return !!element[filterProperty].match(regex);
    }, search);
};

export const searchRawArray = (search, array) => {
    return array.filter((element) => {
        let regex = new RegExp('^' + search, 'i');
        return !!element.match(regex);
    }, search);
};

export const isInArray = (element, array) => {
    return array.indexOf(element) > -1;
};

export const getData = (endpoint, params) => {
    const instance = tokenService.getLocalAccessToken() ? authAxios : axios;
    return instance
        .get(SERVER_URL + endpoint, {params: params})
        .then(({ data }) => data)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    return undefined;
                }
            } else {
                throw error;
            }
        });
};
export const getDataAuthentication = (endpoint) =>
    authAxios
        .get(SERVER_URL + endpoint)
        .then(({ data }) => data)
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    return undefined;
                }
            } else {
                throw error;
            }
        });

export const postData = async (endpoint, data) => {
    authAxios
        .post(API_URL + endpoint, data)
        .then(({ data }) => console.log(data))
        .catch((error) => {
            throw error;
        });
};

export const deleteElementFromArray = (array, element) => {
    let newArray = [...array];
    let index = newArray.indexOf(element);
    newArray.splice(index, 1);

    return newArray;
};

export const getId = (id) => {
    return id === 'me' && tokenService.getLocalAccessToken() ? tokenService.getUserId() : id;
};

export const closeModal = (modalName, setShowModals) => {
    setTimeout(() => {
        setShowModals((prevState) => ({ ...prevState, [modalName]: false }));
    }, 200);
};

export const onClickShowModal = (modalName, setShowModals) => {
    setShowModals((prevState) => ({ ...prevState, [modalName]: true }));
};

export const jobOffersStringPluralForm = (nbOfOffers) => {
    if (nbOfOffers === 1) {
        return ' zlecenie';
    } else if (nbOfOffers % 10 >= 2 && nbOfOffers % 10 <= 4) {
        return ' zlecenia';
    } else {
        return ' zleceń';
    }
};
export const developersStringPluralForm = (nbOfDevelopers) => {
    return nbOfDevelopers === 1 ? ' programista' : ' programistów';
};

export const applicationsStringPluralForm = (nbApplications) => {
    if (nbApplications === 1) {
        return ' aplikacja';
    } else if (nbApplications % 10 >= 2 && nbApplications % 10 <= 4) {
        return ' aplikacje';
    } else {
        return ' aplikacji';
    }
};

export const redirectsCountStringPluralForm = (nbOfRedirects) => {
    if (nbOfRedirects === 1) {
        return ' raz';
    } else {
        return ' razy';
    }
};

export const opinionsStringPluralForm = (nbOfOpinions) => {
    if (nbOfOpinions === 1) {
        return ' opinia';
    } else if (nbOfOpinions % 10 >= 2 && nbOfOpinions % 10 <= 4) {
        return ' opinie';
    } else {
        return ' opinii';
    }
};

export const checkUserRoles = (checkRoles, id) => {
    for (const role of checkRoles) {
        switch (role) {
            case ROLE_ME:
                if (!tokenService.checkIfMe(id)) {
                    return false;
                }
                break;
            case ROLE_DEVELOPER:
                if (!tokenService.getUser().roles.includes(ROLE_DEVELOPER)) return false;
                break;
            case ROLE_PRINCIPLE:
                if (!tokenService.getUser().roles.includes(ROLE_PRINCIPLE)) return false;
                break;
            default:
                return false;
        }
        console.log("X")
    }

    return true;
};

export const getKeyByValue = (object, value) =>  {
    return Object.keys(object).find(key => object[key] === value);
  }
  