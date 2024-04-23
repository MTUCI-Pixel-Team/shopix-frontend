import axios, { AxiosError } from 'axios'
import { SERVER_API } from '../config/constants'
import { instance } from './api-auth.config'
// interface RequestSettings {
//     params?: {}
// }
export class Request {
    static url: string = `${SERVER_API}/api/`

    static async get<T>(
        url: string,
        params?: {
            headers?: {
                [key: string]: string
            }
            params?: {
                [key: string]: string
            }
        },
    ) {
        try {
            console.log(this.url + url, params)
            const response = await axios.get<T>(this.url + url, params)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }

    static async post<T>(url: string, data: T) {
        try {
            const response = await axios.post<T>(this.url + url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
                throw new Error(error.response?.data?.message || error.message)
            }
        }
    }

    static async getWithToken<T>(
        url: string,
        params?: {
            headers?: {
                [key: string]: string
            }
            params?: {
                [key: string]: string
            }
        },
    ) {
        try {
            const response = await instance.get<T>(this.url + url, {
                ...params,
            })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }

    static async postWithToken<T>(url: string, data: T) {
        try {
            const response = await instance.post<T>(this.url + url, data)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }

    static async deleteWithToken<T>(url: string) {
        try {
            const response = await instance.delete<T>(this.url + url)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }
}
