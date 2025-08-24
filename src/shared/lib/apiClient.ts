import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { BASE_URL } from "@/shared/api";

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface ApiClientConfig extends AxiosRequestConfig {
    headers?: Record<string, string>;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClientService = {
  get: async <T>(url: string, config?: ApiClientConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get(url, config);

      return response.data;
    } catch (error) {
      handleApiError(error, url);
      throw error;
    }
  },

  post: async <T, D = unknown>(url: string, data?: D, config?: ApiClientConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post(url, data, config);

      return response.data;
    } catch (error) {
      handleApiError(error, url);
      throw error;
    }
  },

  put: async <T, D = unknown>(url: string, data?: D, config?: ApiClientConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put(url, data, config);

      return response.data;
    } catch (error) {
      handleApiError(error, url);
      throw error;
    }
  },

  delete: async <T>(url: string, config?: ApiClientConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(url, config);

      return response.data;
    } catch (error) {
      handleApiError(error, url);
      throw error;
    }
  },
};

const handleApiError = (error: unknown, url: string) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url,
    });
    if (error.response?.status === 401 && url !== "/user") {
      window.location.href = "/login";
    }
  } else {
    console.error("Unexpected Error:", error);
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};