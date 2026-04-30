"use client";

import axios from "axios";
import axiosPublic from "./axiosPublic";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });

  failedQueue = [];
  failedQueue = [];
};

// attach token (optional fallback)
axiosSecure.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axiosSecure.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // 403 → just reject
    if (error.response?.status === 403) {
      return Promise.reject(error);
    }

    // 401 → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosSecure(originalRequest));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        // IMPORTANT: use public axios
        await axiosPublic.post(
          "/auth/refresh-access-token",
          {},
          {
            withCredentials: true,
          },
        );

        processQueue(null);

        return axiosSecure(originalRequest);
      } catch (err) {
        processQueue(err);

        // cleanup auth
        localStorage.removeItem("accessToken");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosSecure;
