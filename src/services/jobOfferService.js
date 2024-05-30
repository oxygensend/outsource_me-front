import axios from "axios";
import { API_URL } from "../config";

class JobOfferService {

   async addRedirect(slug){
        axios.post(API_URL + "/job-offers/" + slug + "/add-redirect");
    }

}

export default new JobOfferService();