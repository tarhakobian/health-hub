
import axios from 'axios';
import { toast } from 'sonner';

// Update API URL configuration to handle both development and production environments
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // Include credentials in cross-origin requests
});

// Add authorization header to requests when token exists
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Handle specific error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      
      const errorMessage = error.response.data?.message || 'An error occurred';
      
      if (error.response.status === 401) {
        // Unauthorized - clear user info and redirect to login
        localStorage.removeItem('userInfo');
        window.location.href = '/admin-login';
        toast.error('Մուտքն արգելված է: Խնդրում ենք կրկին մուտք գործել');
      } else {
        // For other errors, show the error message
        toast.error(`Սխալ: ${errorMessage}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      toast.error('Սերվերը չի պատասխանում: Խնդրում ենք փորձել ավելի ուշ');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      toast.error('Տեղի է ունեցել անհայտ սխալ');
    }
    
    return Promise.reject(error);
  }
);

export default api;
