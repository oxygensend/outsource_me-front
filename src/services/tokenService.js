import jwtDecode from "jwt-decode";

class TokenService {

    #user;

    getLocalAccessToken() {
        return window.localStorage.getItem("accessToken");
    }

    setLocalAccessToken(accessToken) {
        this.#setUser(accessToken);
        window.localStorage.setItem('accessToken', accessToken);
    }

    getLocalRefreshToken() {
        return window.localStorage.getItem("refreshToken");
    }

    setLocalRefreshToken(refreshToken) {
        window.localStorage.setItem('refreshToken', refreshToken);
    }

    removeTokens() {
        window.localStorage.clear();
    }

    #setUser(accessToken) {
      this.#user = jwtDecode(accessToken);
    }

    getUser() {
        return jwtDecode(this.getLocalAccessToken());
    }

    checkIfMe(id) {
        return(this.getLocalAccessToken() &&  this.getUser().id == id )|| id === 'me';
    }

}

export default new TokenService();

