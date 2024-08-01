import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = () => localStorage.getItem('token')
export const removeTokens = () => {
    console.log('hello')
    localStorage.removeItem('token')
    cookies.remove('refreshToken')
}
export const setToken = (token: string) => localStorage.setItem('token', token)
export const getRefreshToken = () => cookies.get('refreshToken')
export const setRefreshToken = (refreshToken: string) =>
    cookies.set('refreshToken', refreshToken, { path: '/' })
