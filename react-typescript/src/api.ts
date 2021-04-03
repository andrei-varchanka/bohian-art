import axios from "axios";
// @ts-ignore
import { PaintingsApi } from './api/api';


// Create axios instance
const axiosInstance = axios.create();

const baseUrl = 'http://localhost:3000';
// Configuration and base path are not provided
const apiService = new PaintingsApi(undefined, baseUrl, axiosInstance);

export { apiService, axiosInstance };