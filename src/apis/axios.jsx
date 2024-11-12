// apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(config => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;


// GET 요청 함수
const getRequest = (url, params = {}, headers = {}) => {
  return apiClient.get(url, {
    headers,
    params,
  });
};

// POST 요청 함수
const postRequest = (url, data, headers = {}) => {
  return apiClient.post(url, data, { headers });
};

// PUT 요청 함수
const putRequest = (url, data, headers = {}) => {
  return apiClient.put(url, data, { headers });
};

// PATCH 요청 함수
const patchRequest = (url, data, headers = {}) => {
  return apiClient.patch(url, data, { headers });
};

// DELETE 요청 함수
const deleteRequest = (url, data, headers = {}) => {
  return apiClient.delete(url, { headers, data });
};

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
