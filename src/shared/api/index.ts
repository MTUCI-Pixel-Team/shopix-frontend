import axios, { AxiosError } from 'axios'
import { SERVER_API } from '../config/constants'

export class Request {
    static url: string = SERVER_API

    static async get(url: string, params?: { [key: string]: string }) {
        try {
            const response = await axios.get(this.url + url, { params })
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }
}
