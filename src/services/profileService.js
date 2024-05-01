import authAxios from './authAxios';
import { API_URL } from '../config';
import axios from 'axios';

class ProfileService {
    getPersonalData(id) {
        return axios.get(API_URL + '/users/' + id);
    }
    getTechnologies(id) {
        return axios.get(API_URL + '/users/' + id + '/technologies');
    }
    async getJobPositions(id) {
        return axios.get(API_URL + '/users/' + id + '/job-positions');
    }
    async getEducations(id) {
        return axios.get(API_URL + '/users/' + id + '/educations');
    }
    async getLanguages(id) {
        return axios.get(API_URL + '/users/' + id + '/languages');
    }
}

export default new ProfileService();
