import axios from 'axios';
import { reissueToken, subscribeTokenRefresh } from './util/tokenUtils';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiClientForRunMyCode = axios.create({
  baseURL: import.meta.env.VITE_PY_API_URL,  // run-my-code만 해당 서버로 보냄
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

// 로그인 페이지로 리다이렉트 함수
function redirectToLogin() {
  alert('세션이 만료되었습니다. 다시 로그인해주세요.');
  sessionStorage.clear(); 
  window.location.href = '/login'; 
}

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

// run-my-code 요청을 위한 POST 요청 함수
const getRunMyCodeRequest = (articleId) => {
  return apiClientForRunMyCode.get(`/run-my-code/${articleId}`);
};


export { getRequest, postRequest, putRequest, patchRequest, deleteRequest, getRunMyCodeRequest };
