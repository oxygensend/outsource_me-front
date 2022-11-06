import axios from "axios";
import {API_URL} from "../config";
import AuthService from "./authService";
import TokenService from "./tokenService";

const instance = axios.create({
    baseURL: API_URL,
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

instance.interceptors.response.use(
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
                    const {token, refreshToken} = response.data;
                    console.log(token, refreshToken, response.data)
                    console.log(response);
                    TokenService.setLocalAccessToken(token);
                    TokenService.setLocalRefreshToken(refreshToken);
                    instance.defaults.headers.common['Authorization'] = token;

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