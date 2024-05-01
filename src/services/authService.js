import axios from 'axios';
import TokenService from './tokenService';
import { API_URL } from '../config';

class AuthService {
    async refreshToken() {
        console.log(TokenService.getLocalRefreshToken());
        return await axios.post(
            API_URL + '/refresh_token',
            {
                refresh_token: TokenService.getLocalRefreshToken(),
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    async register(data) {
        return axios.post(API_URL + '/auth/register', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    async login(data) {
        return axios.post(API_URL + '/auth/access_token', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    async resetPassword(data) {
        return axios.post(API_URL + '/auth/reset_password', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    async sendResetPasswordLink(data) {
        return axios.post(API_URL + '/auth/resend_password_reset_link', data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }
    logout() {
        TokenService.removeTokens();
        window.location.href = '/';
    }
}

export default new AuthService();
