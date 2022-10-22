import authAxios from "./authAxios";
import {API_URL} from "../config";

class ProfileService {

     getPersonalData(id){
        return  authAxios.get(API_URL + '/users/' + id);
    }
     getTechnologies(id){
        return authAxios.get(API_URL + '/users/' + id + '/technologies');
    }
    async getJobPositions(id){
        return authAxios.get(API_URL + '/users/' + id + '/job_positions');
    }
    async getEducations(id){
        return authAxios.get(API_URL + '/users/' + id + '/educations');
    }
    async getLanguages(id){
        return authAxios.get(API_URL + '/users/' + id + '/languages');
    }
}

export default new ProfileService();