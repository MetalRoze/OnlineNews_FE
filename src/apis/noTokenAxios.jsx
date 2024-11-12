import axios from 'axios';

const noTokenFormDataApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// 아래는 formData를 넘기는 함수 
// POST 요청 
const postRequest = (url, formData) => {
    return noTokenFormDataApiClient.post(url, formData)
        .then(response => response) 
        .catch(error => {
            console.error('POST 요청 오류:', error);
            throw error;
        });
};

// PUT 요청
const putRequest = (url, formData) => {
    return noTokenFormDataApiClient.put(url, formData)
        .then(response => response)
        .catch(error => {
            console.error('PUT 요청 오류:', error);
            throw error;
        });
};

// PATCH 요청
const patchRequest = (url, formData) => {
    return noTokenFormDataApiClient.patch(url, formData)
        .then(response => response)
        .catch(error => {
            console.error('PATCH 요청 오류:', error);
            throw error;
        });
};

export { postRequest, putRequest, patchRequest };