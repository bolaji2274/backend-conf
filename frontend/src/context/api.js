// api.js
import axios from 'axios';

// Create Axios instance with base URL and JSON headers
const api = axios.create({
    baseURL: 'https://api-bkrt.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    const authToken = localStorage.getItem('authTokens');
    if (authToken) {
        const { refresh } = JSON.parse(authToken);
        try {
            const response = await axios.post('https://api-bkrt.onrender.com/api/token/refresh/', { refresh });
            // Update access token in local storage
            const newAuthTokens = { ...JSON.parse(authToken), access: response.data.access };
            localStorage.setItem('authTokens', JSON.stringify(newAuthTokens));
            return response.data.access;
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Handle token refresh error (e.g., redirect to login)
            localStorage.removeItem('authTokens');
            window.location.href = '/login'; // Redirect to login page
        }
    }
    return null;
}

// Axios request interceptor to attach the Authorization header
api.interceptors.request.use(async (config) => {
    let authToken = localStorage.getItem('authTokens');
    if (authToken) {
        let { access } = JSON.parse(authToken);

        // Check if token is expired and refresh it if needed
        const isExpired = checkTokenExpiration(access);
        if (isExpired) {
            access = await refreshAccessToken();
        }

        if (access) {
            config.headers['Authorization'] = `Bearer ${access}`;
        }
    }
    return config;
}, error => Promise.reject(error));

// Utility function to check token expiration
function checkTokenExpiration(token) {
    if (!token) return true;
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = tokenPayload.exp * 1000; // Convert expiry time to milliseconds
    return Date.now() >= expiry;
}

export default api;
