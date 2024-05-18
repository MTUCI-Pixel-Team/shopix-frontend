import axios, { AxiosError } from 'axios'
import { SERVER_API } from '../config/constants'
import { paths } from '../config/router'
import {
    getRefreshToken,
    getToken,
    removeTokens,
    setToken,
} from '../config/storage'

export const instance = axios.create({
    // к запросу будет прикрелп cookies
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
            instance
                .post('/api/users/token/refresh/', {
                    refresh: getRefreshToken(),
                })
                .then((resp) => {
                    setToken(resp.data.access)
                    return instance.request(originalRequest)
                })
                .catch((error) => {
                    console.log(error)
                    if (error instanceof AxiosError) {
                        window.location.href = paths.auth
                        console.log(error, '-----------------')
                        removeTokens()
                    }
                })
        }
        // на случай, если возникла другая ошибка (не связанная с авторизацией)
        // пробросим эту ошибку
        throw error
    },
)
