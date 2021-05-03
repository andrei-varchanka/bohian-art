import axios from "axios";
// @ts-ignore
import {PaintingsApi, UsersApi} from './api/api';

const axiosInstance = axios.create();
const baseUrl = 'http://localhost:3000';

axiosInstance.interceptors.request.use(function (request) {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RfdXNlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCREc1dhSDV6Z0twT0Y0SXZCbklySDJPSkc2SVVyVFRyc3ZaTXlIZnIyUU5KR2MxWmZIVTdmZSIsImlhdCI6MTYyMDA1MzgwOSwiZXhwIjoxNjIwMTQwMjA5fQ.WFQA_r00_fHAuiAaFeiq1dfMELet45gr_KNrJ-A1fUI';
    request.headers['Authorization'] = token;
    return request;
}, function (error) {
    return Promise.reject(error);
});

const paintingService = new PaintingsApi(undefined, baseUrl, axiosInstance);
const userService = new UsersApi(undefined, baseUrl, axiosInstance);

export { paintingService, userService, axiosInstance };