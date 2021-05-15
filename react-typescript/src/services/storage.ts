import {User} from "../api/api";
import Cookies from 'universal-cookie';

class StorageService {

    cookies = new Cookies();

    setToken(token: string) {
        this.cookies.set('auth_token', token, {path: '/'});
    }

    getToken() {
        return this.cookies.get('auth_token');
    }

    clearToken() {
        this.cookies.set('auth_token', '', {path: '/'});
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

    logout() {
        this.clearUser();
        this.clearToken();
        window.location.href = window.location.origin;
    }
}

const storageService = new StorageService();

export default storageService;