import axios, { AxiosError } from 'axios'
import { SERVER_API } from '../config/constants'
import { getRefreshToken, getToken, setToken } from '../config/storage'

export const instance = axios.create({
    // к запросу будет приуепляться cookies
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    baseURL: SERVER_API,
})

// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из localStorage
instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
})

// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
instance.interceptors.response.use(
    // в случае валидного accessToken ничего не делаем:
    (config) => {
        return config
    },
    // в случае просроченного accessToken пытаемся его обновить:
    async (error) => {
        // предотвращаем зацикленный запрос, добавляя свойство _isRetry
        const originalRequest = { ...error.config }
        originalRequest._isRetry = true
        if (
            // проверим, что ошибка именно из-за невалидного accessToken
            error.response.status === 401 &&
            // проверим, что запрос не повторный
            error.config &&
            !error.config._isRetry
        ) {
            try {
                // запрос на обновление токенов
                const resp = await instance.post('/api/users/token/refresh/', {
                    refresh: getRefreshToken(),
                })
                // сохраняем новый accessToken в localStorage
                console.log(resp)
                setToken(resp.data.access)
                // переотправляем запрос с обновленным accessToken
                return instance.request(originalRequest)
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.message)
                }
            }
        }
        // на случай, если возникла другая ошибка (не связанная с авторизацией)
        // пробросим эту ошибку
        throw error
    },
)
