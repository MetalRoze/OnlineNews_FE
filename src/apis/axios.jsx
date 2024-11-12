import axios from 'axios';

// 기본 axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가 (Authorization 헤더에 토큰 추가)
axiosClient.interceptors.request.use(
  (config) => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET 요청 함수
const getRequest = (url, params = {}, headers = {}) => {
  return axiosClient.get(url, {
    headers,
    params,
  });
};

// POST 요청 함수
const postRequest = (url, data, headers = {}) => {
  return axiosClient.post(url, data, { headers });
};

// PUT 요청 함수
const putRequest = (url, data, headers = {}) => {
  return axiosClient.put(url, data, { headers });
};

// DELETE 요청 함수
const deleteRequest = (url, data, headers = {}) => {
  return axiosClient.delete(url, { headers, data });
};

export { getRequest, postRequest, putRequest, deleteRequest };
