import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

export const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

export const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((cb) => cb(newAccessToken));
    refreshSubscribers = [];
};

export const reissueToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;

        try {
            const refreshToken = sessionStorage.getItem('refreshToken');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/token/reissue`,
                refreshToken ,
                {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                }
            );

            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken; 
            sessionStorage.setItem('authToken', newAccessToken);
            sessionStorage.setItem('refreshToken',newRefreshToken);
            isRefreshing = false;
            onRefreshed(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('리프레시 토큰 요청 실패:', error);
            isRefreshing = false;
            throw error;
        }
    }
    return new Promise((resolve) => {
        subscribeTokenRefresh(resolve);
    });
};
