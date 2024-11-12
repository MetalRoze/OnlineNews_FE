import axios from 'axios';

// 기본 axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// API 요청 함수(기본 get)
const apiRequest = async (url, method = 'GET', data = null, headers = {}) => {
  const config = {
    url,
    method,
    headers: {
      ...axiosClient.defaults.headers,
      ...headers, // 헤더 추가하고 싶은 경우
    },
  };

  // FormData를 보내는 경우
  if (data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'; // FormData일 경우 Content-Type 변경
    config.data = data;
  } else if (data) {
    config.data = data;
  }

  try {
    const response = await axiosClient(config);
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

// POST 요청 함수 (기본적인 POST 요청)
const postRequest = (url, data, headers) => {
  return apiRequest(url, 'POST', data, headers);
};

// GET 요청 함수 (기본적인 GET 요청)
const getRequest = (url, headers) => {
  return apiRequest(url, 'GET', null, headers);
};

// PUT 요청 함수 (기본적인 PUT 요청)
const putRequest = (url, data, headers) => {
  return apiRequest(url, 'PUT', data, headers);
};

// PATCH 요청 함수 (기본적인 PATCH 요청)
const patchRequest = (url, data, headers) => {
  return apiRequest(url, 'PATCH', data, headers);
};

// DELETE 요청 함수 (기본적인 DELETE 요청)
const deleteRequest = (url, data, headers) => {
  return apiRequest(url, 'DELETE', data, headers);
};

// axiosClient와 각 요청 메서드를 내보냄
export {
  axiosClient,
  postRequest,
  getRequest,
  putRequest,
  patchRequest,
  deleteRequest,
};
