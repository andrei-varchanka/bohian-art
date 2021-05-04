import axios from "axios";
// @ts-ignore
import {PaintingsApi, UsersApi} from '../api/api';
import storageService from "./storage";

const axiosInstance = axios.create();
const baseUrl = 'http://localhost:3000';

axiosInstance.interceptors.request.use(function (request) {
    request.headers['Authorization'] = storageService.getToken();
    return request;
}, function (error) {
    return Promise.reject(error);
});

const paintingService = new PaintingsApi(undefined, baseUrl, axiosInstance);
const userService = new UsersApi(undefined, baseUrl, axiosInstance);

export { paintingService, userService, axiosInstance };