import axios from "axios";
import {SERVER_URL} from "../config";
import {TokenService} from "./tokenService";
import AuthService from "./authService";

const instance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(
    config => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;

        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const response = await AuthService.refreshToken();
                    const {accessToken, refreshToken} = response.data;
                    TokenService.setLocalAccessToken(accessToken);
                    TokenService.setLocalRefreshToken(refreshToken);
                    instance.defaults.headers.common['Authorization'] = accessToken;

                    return instance(originalConfig);
                } catch (e) {
                    if (e.response && e.response.data) {
                        return Promise.reject(e.response.data);
                    }

                    return Promise.reject(e);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }

        }
        return Promise.reject(err);
    }
)


export default instance;