import axios from 'axios';
import { reissueToken, subscribeTokenRefresh } from './util/tokenUtils';

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

// 응답 인터셉터
noContentTypeApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            const errorCode = error.response?.data?.code;

            originalRequest._retry = true;

            console.log('토큰 갱신 로직 실행');
            try {
                const newAccessToken = await reissueToken();
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    console.log('토큰 갱신 완료! API를 다시 호출합니다.');
                    return apiClient(originalRequest);
                } 
            } catch (e) {
                console.error('토큰 갱신 중 오류 발생:', e);
                if (e.response?.data?.code === 'TOKEN_003') {
                console.error('리프레시 토큰이 만료되었습니다. 로그인 창으로 이동');
                redirectToLogin(); 
                }
            }
        }

        return Promise.reject(error);
    }
);

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