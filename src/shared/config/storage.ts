import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = () => localStorage.getItem('token')
export const removeTokens = () => {
    localStorage.removeItem('token')
    cookies.remove('refreshToken')
}
export const setToken = (token: string) => localStorage.setItem('token', token)
export const getRefreshToken = () => cookies.get('refreshToken')
export const setRefreshToken = (refreshToken: string) =>
    cookies.set('refreshToken', refreshToken, { path: '/' })
// export const useToken = () => {
//     const [cookies, setCookie] = useCookies(['refreshToken'])

//     const getToken = () => localStorage.getItem('token')
//     const setToken = (token: string) => localStorage.setItem('token', token)
//     const getRefreshToken = () => cookies.refreshToken
//     const setRefreshToken = (refreshToken: string) =>
//         setCookie('refreshToken', refreshToken, { path: '/' })

//     return { getToken, setToken, getRefreshToken, setRefreshToken }
// }
