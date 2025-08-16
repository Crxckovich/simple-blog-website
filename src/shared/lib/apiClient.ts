import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export const BASE_URL = 'https://api.realworld.show/api';

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
        'Content-Type': 'application/json',
    },
});

export const apiClientService = {
    get: async <T>(url: string, config?: ApiClientConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await apiClient.get(url, config);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    post: async <T, D = unknown>(url: string, data?: D, config?: ApiClientConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await apiClient.post(url, data, config);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    put: async <T, D = unknown>(url: string, data?: D, config?: ApiClientConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await apiClient.put(url, data, config);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    delete: async <T>(url: string, config?: ApiClientConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await apiClient.delete(url, config);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
};

// Обработка ошибок
const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
    } else {
        console.error('Unexpected Error:', error);
    }
};

// Функция для добавления токена авторизации (если требуется)
export const setAuthToken = (token: string | null) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};