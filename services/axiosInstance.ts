// services/axiosInstance.ts

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo một axios instance riêng
const api = axios.create({
  baseURL: 'https://jwtauthapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn token vào headers trước khi gửi request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi chung, ví dụ 401 (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('🚫 Token không hợp lệ hoặc đã hết hạn!');
      // Có thể redirect tới login hoặc logout ở đây
    }
    return Promise.reject(error);
  }
);

export default api;
