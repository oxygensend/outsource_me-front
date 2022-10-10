import axios from "axios";
import TokenService from "./tokenService";
import {SERVER_URL} from "../config";

class AuthService {
    async refreshToken() {
        return axios.post(SERVER_URL + '/refresh_token', {
            refresh_token: TokenService.getLocalRefreshToken(),
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
    }

    async register(data) {
        return axios.post(SERVER_URL + '/register', data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
    }

    async login(data) {
        return axios.post(SERVER_URL + '/login', data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
    }

    async resetPassword(data) {
        return axios.post(SERVER_URL + '/reset_password_execute', data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
    }

    async sendResetPasswordLink(data) {
        return axios.post(SERVER_URL + '/reset_password_send_link', data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
    }
    logout() {
        TokenService.removeTokens();
        window.location.href = '/';
    }
}

export default new AuthService();