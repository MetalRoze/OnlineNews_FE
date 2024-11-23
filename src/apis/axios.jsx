import axios from 'axios';
import { reissueToken, subscribeTokenRefresh } from './util/tokenUtils';

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


// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log('토큰 갱신 로직 실행');
          const newAccessToken = await reissueToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log('토큰 갱신 완료! API를 다시 호출합니다');

          return apiClient(originalRequest);
      }

      return Promise.reject(error);
  }
);

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
