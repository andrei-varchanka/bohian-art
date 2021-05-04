import {User} from "../api/api";

class StorageService {

    setToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    clearToken() {
         localStorage.removeItem('access_token');
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    clearUser() {
        localStorage.removeItem('user');
    }
}

const storageService = new StorageService();

export default storageService;