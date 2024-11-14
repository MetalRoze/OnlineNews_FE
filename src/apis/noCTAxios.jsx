import axios from 'axios';

const noContentTypeApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터 설정
noContentTypeApiClient.interceptors.request.use(config => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default noContentTypeApiClient;

// POST 요청 
const postRequest = (url, formData) => {
    return noContentTypeApiClient.post(url, formData)
        .then(response => response) 
        .catch(error => {
            console.error('POST 요청 오류:', error);
            throw error;
        });
};

// PUT 요청
const putRequest = (url, formData) => {
    return noContentTypeApiClient.put(url, formData)
        .then(response => response)
        .catch(error => {
            console.error('PUT 요청 오류:', error);
            throw error;
        });
};

// PATCH 요청
const patchRequest = (url, formData) => {
    return noContentTypeApiClient.patch(url, formData)
        .then(response => response)
        .catch(error => {
            console.error('PATCH 요청 오류:', error);
            throw error;
        });
};

export { postRequest, putRequest, patchRequest };